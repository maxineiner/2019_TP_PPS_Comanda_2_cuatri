<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once "../src/productoApi.php";
require_once "../src/compraApi.php";
require_once "../src/MWparaAutentificar.php";
require_once "../src/MWparaCORS.php";


return function (App $app) {
    $container = $app->getContainer();

    $app->group('/usuario', function(){
		$this->post('/borrar', \productoApi::class . ':BorrarUno');
        $this->post('/', \productoApi::class . ':CargarUno');
        $this->get('/', \productoApi::class . ':TraerTodos')->add(\MWparaCORS::class . ':HabilitarCORSTodos');//->add(\MWparaAutentificar::class . ':VerificarUsuarioTraer');
    })->add(\MWparaCORS::class . ':HabilitarCORSTodos');

    $app->post('/login', \productoApi::class . ':Login');

    $app->group('/Compra', function(){
        $this->post('', \compraApi::class . ':CargarUno');//->add(\MWparaAutentificar::class . ':VerificarLogeadoCompra');
        $this->get('', \compraApi::class . ':TraerTodos');//->add(\MWparaAutentificar::class . ':VerificarTraerCompra');
    });
};
