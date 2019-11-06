<?php
require_once "../src/app/models/mesa.php";
require_once "../src/IApiUsable.php";
require_once "../src/AutentificadorJWT.php";
use App\Models;
use App\Models\mesa;

class mesaApi implements IApiUsable
{
    public function TraerUno($request, $response, $args){} 
   	public function TraerTodos($request, $response, $args){
   	    return $response->withJson(mesa::all(),200);
   	} 
   	public function CargarUno($request, $response, $args){
        $response = $response->withAddedHeader('metodo', "Metodo crear mesa POST");
        $payload = json_decode($response->getHeader('payload')[0]);
        if($payload->tipo == "socios")
        {
            $miMesa = new mesa();
            $miMesa->estado="cerrada";
            $miMesa->codigo=mesaApi::generarCodigo();
            $miMesa->save();
            return $response->withJson("Mesa creada", 200);
        }
        else
        {
            return $response->withJson("Solo los socios pueden crear mesas", 401);
        }
    }
   	public function BorrarUno($request, $response, $args){}
    public function ModificarUno($request, $response, $args){
        $response = $response->withAddedHeader('metodo', "Metodo modificar mesa POST");
        $payload = json_decode($response->getHeader('payload')[0]);
        $arrayDeParametros = $request->getParsedBody();
        if(isset($arrayDeParametros['codigo']))
        {
            $mesa = new mesa();
            $mesa = mesa::where('codigo', $arrayDeParametros['codigo'])->first();
            
            if(!$mesa)
            {
                return $response->withJson("Codigo de mesa invalido", 401);
            }
        }
        else
        {
            return $response->withJson("Debe ingresar un codigo de mesa");
        }
        if($payload->tipo == "mozos" || $payload->tipo == "socios")
        {
            if(isset($arrayDeParametros['estado']))
            {
                $estado = $arrayDeParametros['estado'];
                if($estado == "cerrada" && $payload->tipo == "mozos")
                    return $response->withJson("Solo socios pueden cerrar una mesa", 401);
            }
            else
            {
                $estado = $mesa->estado;
            }
            if(isset($arrayDeParametros['idCliente']))
            {
                $idCliente = $arrayDeParametros['idCliente'];
            }
            else
            {
                $idCliente = $mesa->idCliente;
            }
            if(isset($arrayDeParametros['idPedido']))
            {
                $idPedido = $arrayDeParametros['idPedido'];
            }
            else
            {
                $idPedido = $mesa->idPedido;
            }
            
            $mesa->estado = $estado;
            $mesa->idPedido = $idPedido;
            $mesa->idCliente = $idCliente;
            $mesa->save();
            return $response->withJson("Mesa modificada", 200);
        }
        else
        {
            return $response->withJson("Solo mozos y socicos", 401);
        }

    }
    public function generarCodigo()
    {
        $codigo = '';
        $patternNum = '1234567890';
        $patternLetra = 'abcdefghijklmnopqrstuvwxyz';
        $maxN = strlen($patternNum) -1;
        $maxL = strlen($patternLetra) -1;
        $codigo .= $patternNum{mt_rand(0,$maxN)};
        for($i=0;$i < 2;$i++) 
        {
            $codigo .= $patternNum{mt_rand(0,$maxN)};
            $codigo .= $patternLetra{mt_rand(0,$maxL)};
        }
        
        $existe = mesa::where('codigo', $codigo)->first();
        if($existe)
        {
            $codigo = generarCodigo();
        }
        return $codigo;
    }

    public function fotoMesa($request, $response, $args)
    {
        $response = $response = $response->withAddedHeader('metodo', "Metodo agregar foto mesa POST");
        $payload = json_decode($response->getHeader('payload')[0]);
        $arrayDeParametros = $request->getParsedBody();

        if(isset($arrayDeParametros['codigo']))
        {
            $mesa = new mesa();
            $mesa = mesa::where('codigo', $arrayDeParametros['codigo'])->first();
            
            if(!$mesa)
            {
                return $response->withJson("Codigo de mesa invalido", 401);
            }
        }
        else
        {
            return $response->withJson("Debe ingresar un codigo de mesa");
        }

        if($payload->tipo == "mozos" || $payload->tipo == "socios")
        {
            $dic = "../Fotos/";
            $dicBackup = "../backUpFotos/";
            $nameImagen = $_FILES["imagen"]["name"];
            
            $datoImagen = $arrayDeParametros['codigo'];
            	
            $explode = explode(".", $nameImagen);
            $tamaño = count($explode);
            $dic .= $datoImagen;
            $dic .= ".";
            $dic .= $explode[$tamaño - 1];
            $hoy = date("m.d.y");
            $dicBackup .= $datoImagen;
            $dicBackup .= "-".$hoy;
            $dicBackup .= ".";
            $dicBackup .= $explode[$tamaño - 1];
            if(!file_exists($dic))
            {
                move_uploaded_file($_FILES["imagen"]["tmp_name"], $dic);	
            }
            else
            {
                copy($dic, $dicBackup);
                move_uploaded_file($_FILES["imagen"]["tmp_name"], $dic);
            }
            $mesa->foto = $dic;
            $mesa->save();
            return $response->withJson("Foto cargada", 200);
        }
        else
        {
            return $response->withJson("No tienes permisos para agregar o cambiar una foto", 401);
        }
    }
}
?>