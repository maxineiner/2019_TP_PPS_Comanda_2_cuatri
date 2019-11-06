<?php
require_once "../src/app/models/encuesta.php";
require_once "../src/app/models/mesa.php";
require_once "../src/IApiUsable.php";
require_once "../src/AutentificadorJWT.php";
use App\Models;
use App\Models\encuesta;
use App\Models\mesa;

class encuestaApi implements IApiUsable
{
    public function TraerUno($request, $response, $args){

    } 
   	public function TraerTodos($request, $response, $args){

    } 
   	public function CargarUno($request, $response, $args){
        $arrayDeParametros = $request->getParsedBody();
        if(isset($arrayDeParametros['codigoMesa']))
        {
            $codigo = $arrayDeParametros['codigoMesa'];
            $mesa = mesa::where('codigo', $codigo)->first();
            if(!$mesa)
                return $response->withJson("Codigo de mesa invalido", 401);
            if($mesa->estado != "cerrada")
                return $response->withJson("La mesa debe estar cerrada", 401);
        }
        else {
            return $response->withJson("Debe ingresar el codigo de mesa", 401);
        }

        if(isset($arrayDeParametros['mesa']))
        {
            $mesa = $arrayDeParametros['mesa'];
            if(strlen($mesa) == 0)
                $mesa = 0;
            if($mesa < 0 || $mesa > 10)
                return $response->withJson("La puntuacion debe ir de 0 a 10");
        }
        else {
            return $response->withJson("Puntuacion de mesa invalida", 401);
        }
        if(isset($arrayDeParametros['restaurant']))
        {
            $restaurant = $arrayDeParametros['restaurant'];
            if(strlen($restaurant) == 0)
                $restaurant = 0;
            if($restaurant < 0 || $restaurant > 10)
                return $response->withJson("La puntuacion debe ir de 0 a 10");
        }
        else {
            return $response->withJson("Puntuacion de restaurant invalida", 401);
        }
        if(isset($arrayDeParametros['mozo']))
        {
            $mozo = $arrayDeParametros['mozo'];
            if(strlen($mozo) == 0)
                $mozo = 0;
            if($mozo < 0 || $mozo > 10)
                return $response->withJson("La puntuacion debe ir de 0 a 10");
        }
        else {
            return $response->withJson("Puntuacion de mozo invalida", 401);
        }
        if(isset($arrayDeParametros['cocinero']))
        {
            $cocinero = $arrayDeParametros['cocinero'];
            if(strlen($cocinero) == 0)
                $cocinero = 0;
            if($mozo < 0 || $mozo > 10)
                return $response->withJson("La puntuacion debe ir de 0 a 10");
        }
        else {
            return $response->withJson("Puntuacion de cocinero invalida", 401);
        }

        $encuesta = new encuesta();
        $encuesta->mozo = $mozo;
        $encuesta->mesa = $mesa;
        $encuesta->restaurant = $restaurant;
        $encuesta->cocinero = $cocinero;
        $encuesta->save();
        return $response->withJson("Cargada correctamente", 200);
    }
   	public function BorrarUno($request, $response, $args){

    }
   	public function ModificarUno($request, $response, $args){

    }
}
?>