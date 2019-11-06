<?php
require_once "../src/app/models/usuario.php";
require_once "../src/IApiUsable.php";
require_once "../src/AutentificadorJWT.php";
use App\Models;
use App\Models\usuario;

class usuarioApi implements IApiUsable
{
    public function TraerUno($request, $response, $args)
    {

    }
    public function TraerTodos($request, $response, $args)
    {
        return $response->withJson(usuario::all(), 200);
    }
    public function CargarUno($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();

        if(isset($ArrayDeParametros['account']))
        {
            $account = $ArrayDeParametros['account'];
            $comprobarcion = usuario::where('account', $account)->first();
           
            if($comprobarcion)
            {
                $objDelaRespuesta->respuesta="Ese nombre de account ya existe";   
                return $response->withJson($objDelaRespuesta, 401);
            }
        }
        else {
            $objDelaRespuesta->respuesta="Debe ingresar una account";   
            return $response->withJson($objDelaRespuesta, 401);
        }
       
        if(isset($ArrayDeParametros['password']))
        {
            $password= $ArrayDeParametros['password'];
            if(strlen($password) == 0)
            {
                $objDelaRespuesta->respuesta="Debe ingresar una password";   
                return $response->withJson($objDelaRespuesta, 401);
            }
        }
        else {
            $objDelaRespuesta->respuesta="Debe ingresar una password";   
            return $response->withJson($objDelaRespuesta, 401);
        }

        if(isset($ArrayDeParametros['tipo']))
        {
            $tipo= $ArrayDeParametros['tipo'];
        }
        else {
            $objDelaRespuesta->respuesta="Debe ingresar un tipo";   
            return $response->withJson($objDelaRespuesta, 401);
        }
        

        if($tipo != "cerveceros" && $tipo != "bartender" && $tipo != "cocineros" && $tipo != "mozos" && $tipo != "socios")
        {
            $objDelaRespuesta->respuesta="Nombre de tipo invalido";   
            return $response->withJson($objDelaRespuesta, 401);
        }
        
        $miUser = new usuario();
        $miUser->account=$account;
        $miUser->password=$password;
        $miUser->tipo=$tipo;
        $miUser->activo = true;
        $miUser->save();
        
        $objDelaRespuesta->respuesta="Se cargo correctamente";   
        return $response->withJson($objDelaRespuesta, 200);
    }
    public function BorrarUno($request, $response, $args)
    {
        $response = $response->withAddedHeader('metodo', "Metodo Borrar POST");
        $ArrayDeParametros = $request->getParsedBody();
        $payload = json_decode($response->getHeader('payload')[0]);
        if($payload->tipo == "socios")
        {
            if(isset($ArrayDeParametros['idUsuario']))
            {
                $usuario = usuario::where('id', $ArrayDeParametros['idUsuario'])->first();
                if($usuario)
                {
                    if(isset($ArrayDeParametros['orden']))
                    {
                        switch($ArrayDeParametros['orden'])
                        {
                            case "borrar":
                                $usuario->delete();
                                return $response->withJson("Borrado", 200);
                            case "suspender":
                                $usuario->activo = false;
                                $usuario->save();
                                return $response->withJson("Suspendido", 200);
                            default:
                                return $response->withJson("Orden no valida", 401);
                        }
                    }
                }
                else {
                    return $response->withJson("Usuario no encontrado", 401);
                }
            }
            else {
                return $response->withJson("Debe ingresar un id de usuario");
            }
        }
        else {
            return $response->withJson("Solo socios pueden suspender o borrar", 401);
        }
    }
    public function ModificarUno($request, $response, $args)
    {
        $response = $response->withAddedHeader('metodo', "Metodo modificar POST");
        $ArrayDeParametros = $request->getParsedBody();
        $payload = json_decode($response->getHeader('payload')[0]);
        if(isset($ArrayDeParametros['newPassword']))
        {
            $usuario = usuario::where('account', $payload->account)->first();
            if(strlen($ArrayDeParametros['newPassword']) > 0)
            { 
                $usuario->password = $ArrayDeParametros['newPassword'];
                $usuario->save();
            }
            else {
                return $response->withJson("Debe ingresar una nueva password", 401);
            }
        }
        else {
            return $response->withJson("Debe ingresar una nueva password", 401);
        }
    }
    public function Login($request, $response, $args)
    {
        $response = $response->withAddedHeader('metodo', "Metodo Login POST");
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();

        if(isset($ArrayDeParametros['account']))
        {
            $account = $ArrayDeParametros['account'];
        }
        else {
            $objDelaRespuesta->respuesta="Debe ingresar una account";   
            return $response->withJson($objDelaRespuesta, 401);
        }
       
        if(isset($ArrayDeParametros['password']))
        {
            $password= $ArrayDeParametros['password'];
            if(strlen($password) == 0)
            {
                $objDelaRespuesta->respuesta="Debe ingresar una password";   
                return $response->withJson($objDelaRespuesta, 401);
            }
        }
        else {
            $objDelaRespuesta->respuesta="Debe ingresar una password";   
            return $response->withJson($objDelaRespuesta, 401);
        }

        $usuarioLogin = new usuario();
        $usuarioLogin = $usuarioLogin->where('account', $account)->first();

        if($usuarioLogin)
        {
            if($usuarioLogin->password == $password)
            {
                $id = $usuarioLogin->id;
                $datos = array(
                    'id'=>$id,
                    'account'=>$account,
                    'tipo'=>$usuarioLogin->tipo
                );
                $fichero = "../logs/logins.txt";
                $Obj = new stdClass;
                $Obj->Metodo = "Login";
                $Obj->Id = $id;
                $Obj->Account = $account;
                $now = new DateTime('NOW');
                $Obj->Fecha = $now;
                $actual = json_encode($Obj);
                if(file_exists($fichero))
                {
                    file_put_contents($fichero, $actual.="\r\n", FILE_APPEND);
                }
                else
                {
                    file_put_contents($fichero, $actual.="\r\n");
                }
                return AutentificadorJWT::CrearToken($datos);
            }
            else
            {
                return $response->withJson("Password incorrectas", 200);
            }
        }
        else
        {
            return $response->withJson("Account invalido", 200);
        }   
    }
}

?>