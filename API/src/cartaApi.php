<?php
require_once "../src/app/models/carta.php";
require_once "../src/IApiUsable.php";
require_once "../src/AutentificadorJWT.php";
use App\Models;
use App\Models\carta;

class cartaApi implements IApiUsable
{
    public function TraerUno($request, $response, $args){}
   	public function TraerTodos($request, $response, $args){} 
   	public function CargarUno($request, $response, $args){}
   	public function BorrarUno($request, $response, $args){}
   	public function ModificarUno($request, $response, $args){}
}

?>