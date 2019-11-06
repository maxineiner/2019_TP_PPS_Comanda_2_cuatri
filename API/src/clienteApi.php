<?php
require_once "../src/app/models/cliente.php";
require_once "../src/app/models/pedido.php";
require_once "../src/IApiUsable.php";
require_once "../src/AutentificadorJWT.php";
use App\Models;
use App\Models\cliente;
use App\Models\pedido;

class clienteApi implements IApiUsable
{
    public function TraerUno($request, $response, $args){}
   	public function TraerTodos($request, $response, $args){
        $response = $response->withAddedHeader('metodo', "Metodo traer clientes GET");
        if(isset($args['codigo']))
        {
            $codigo = $args['codigo'];
            $pedidos = pedido::where('codigo', $codigo)->get();
            return $response->withJson($pedidos, 200);
        }
        else
        {
            return $response->withJson("Debe ingresar su codigo", 401);
        }
    } 
   	public function CargarUno($request, $response, $args){
        $response = $response->withAddedHeader('metodo', "Metodo alta cliente POST");
        $ArrayDeParametros = $request->getParsedBody();
        $payload = json_decode($response->getHeader('payload')[0]);
      
        if($payload->tipo == "mozos" || $payload->tipo == "socios")
        {
            if(isset($ArrayDeParametros['nombre']))
            {
                $nombre = $ArrayDeParametros['nombre'];
            }
            else
            {
                return $response->withJson('Debe ingresar un nombre', 401);
            }
            if(isset($ArrayDeParametros['apellido']))
            {
                $apellido = $ArrayDeParametros['apellido'];
            }
            else
            {
                return $response->withJson('Debe ingresar un apellido', 401);
            }

            if(strlen($nombre) > 0 && strlen($apellido) > 0)
            {
                $miCliente = new cliente();
                $miCliente->nombre = $nombre;
                $miCliente->apellido = $apellido;
                $miCliente->save();

                return $response->withJson('Se cargo existosamente', 200);
            }
        }
        else
        {
            return $response->withJson("Solo mozos o socios", 401);
        }
    }
   	public function BorrarUno($request, $response, $args){}
    public function ModificarUno($request, $response, $args){}
}

?>