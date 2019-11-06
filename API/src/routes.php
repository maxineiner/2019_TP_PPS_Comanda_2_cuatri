<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
require_once "../src/usuarioApi.php";
require_once "../src/pedidoApi.php";
require_once "../src/clienteApi.php";
require_once "../src/encuestaApi.php";
require_once "../src/mesaApi.php";
require_once "../src/logs.php";
require_once "../src/MWparaAutentificar.php";

return function (App $app) {
    $container = $app->getContainer();
    
    $app->group('/usuario', function(){
        $this->post('/', \usuarioApi::class . ':CargarUno');
        $this->get('/', \usuarioApi::class . ':TraerTodos')->add(\MWparaAutentificar::class . ':VerificarToken');
        $this->post('/borrar', \usuarioApi::class . ':BorrarUno')->add(\MWparaAutentificar::class . ':VerificarToken');
    });

    $app->post('/login', \usuarioApi::class . ':Login');

    $app->group('/pedido', function(){
        $this->post('', \pedidoApi::class . ':CargarUno');
        $this->get('', \pedidoApi::class . ':TraerTodos');
        $this->post('/', \pedidoApi::class . ':ModificarUno');
    })->add(\MWparaAutentificar::class . ':VerificarToken');

    $app->group('/cliente', function(){
        $this->post('', \clienteApi::class . ':CargarUno')->add(\MWparaAutentificar::class . ':VerificarToken');
        $this->get('/{codigo}', \clienteApi::class . ':TraerTodos');
    });

    $app->group('/mesa', function(){
        $this->post('', \mesaApi::class . ':CargarUno')->add(\MWparaAutentificar::class . ':VerificarToken');
        $this->post('/', \mesaApi::class . ':ModificarUno')->add(\MWparaAutentificar::class . ':VerificarToken');
        $this->post('/foto', \mesaApi::class . ':fotoMesa')->add(\MWparaAutentificar::class . ':VerificarToken');
        $this->get('', \mesaApi::class . ':TraerTodos');
    });

    $app->group('/encuesta', function(){
        $this->post('/', \encuestaApi::class . ':CargarUno');
    });

    $app->group('/logs', function(){
        $this->get('/operacionesPorSector', \logs::class . ':OperacionesPorSector');
        $this->get('/ingresos', \logs::class . ':Ingresos');
        $this->get('/operacionesPorPersona/{codigo}', \logs::class . ':OperacionesPorPersona');
    })->add(\MWparaAutentificar::class . ':VerificarToken');;
};  
