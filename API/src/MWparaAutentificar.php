<?php
require_once "../src/AutentificadorJWT.php";
class MWparaAutentificar
{
 /**
   * @api {any} /MWparaAutenticar/  Verificar Usuario
   * @apiVersion 0.1.0
   * @apiName VerificarUsuario
   * @apiGroup MIDDLEWARE
   * @apiDescription  Por medio de este MiddleWare verifico las credeciales antes de ingresar al correspondiente metodo 
   *
   * @apiParam {ServerRequestInterface} request  El objeto REQUEST.
 * @apiParam {ResponseInterface} response El objeto RESPONSE.
 * @apiParam {Callable} next  The next middleware callable.
   *
   * @apiExample Como usarlo:
   *    ->add(\MWparaAutenticar::class . ':VerificarUsuario')
   */
	public function VerificarToken($request, $response, $next)
	{
		$objDelaRespuesta= false;

		
		$arrayConToken = $request->getHeader('token');
		$token = $arrayConToken[0];
		
				
		try 
		{
			AutentificadorJWT::verificarToken($token);
			$objDelaRespuesta = true;      
		}
		catch (Exception $e) {      
			$objDelaRespuesta = false;     
		}

		if($objDelaRespuesta)
		{
			$payload=AutentificadorJWT::ObtenerData($token);
			$tipo = $payload->tipo;
			$id = $payload->id;
			$cuenta = $payload->account;
			$response = $next($request, $response->withAddedHeader('payload',json_encode($payload)));
		}
		else
		{
			return $response->withJson("Error al leer los datos de sesion", 401);
		}
		if($tipo != "socios")
		{
			$fichero = "../logs/logs.txt";
			$Obj = new stdClass;
			$Obj->Metodo = $response->getHeader('metodo')[0];
			$Obj->Id = $id;
			$Obj->Account = $cuenta;
			$Obj->Tipo = $tipo;
			$Obj->Fecha = new DateTime('NOW');
			$actual = json_encode($Obj);
			if(file_exists($fichero))
			{
				file_put_contents($fichero, $actual.="\r\n", FILE_APPEND);
			}
			else
			{
				file_put_contents($fichero, $actual.="\r\n");
			}
		}
		return $response;
	}

	
}