<?php
require_once "../src/app/models/compra.php";
require_once "../src/IApiUsable.php";
require_once "../src/AutentificadorJWT.php";
use App\Models;
use App\Models\compra;

class compraApi implements IApiUsable
{
    public function TraerUno($request, $response, $args)
    {

    }
    public function TraerTodos($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        $idUsuario = $response->getHeader('id')[0];
        if($idUsuario == -1)
        {
            $todos = compra::all();
            $objDelaRespuesta->respuesta=$todos;
            $response = $response->withJson($objDelaRespuesta, 200);
        }
        else
        {
            $algunos = compra::where('idUsuario','=', $idUsuario)->get();
            $objDelaRespuesta->respuesta=$algunos;
            $response = $response->withJson($objDelaRespuesta, 200);
        }
        return $response;
       
    }
    public function CargarUno($request, $response, $args)
    {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();

        $articulo= $ArrayDeParametros['articulo'];
        $precio= $ArrayDeParametros['precio'];
        $fecha = new DateTime('now');
        
        $headers = $response->getHeader('id');
		$idUsuario = $headers[0];

        $miCompra = new compra();
        $miCompra->idUsuario = $idUsuario;
        $miCompra->articulo=$articulo;
        $miCompra->fecha=$fecha;
        $miCompra->precio=$precio;
        $miCompra->save();
        
        $objDelaRespuesta->respuesta="Se cargo correctamente";   
        return $response->withJson($objDelaRespuesta, 200);
    }
    public function BorrarUno($request, $response, $args)
    {

    }
    public function ModificarUno($request, $response, $args)
    {

    }
}

?>