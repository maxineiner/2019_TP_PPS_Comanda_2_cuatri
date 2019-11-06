<?php
require_once "../src/app/models/pedido.php";
require_once "../src/app/models/carta.php";
require_once "../src/IApiUsable.php";
require_once "../src/AutentificadorJWT.php";
use App\Models;
use App\Models\pedido;
use App\Models\carta;

class pedidoApi implements IApiUsable
{
    public function TraerUno($request, $response, $args){}
    public function TraerTodosFinalizados($request, $response, $args)
    {

    }
   	public function TraerTodos($request, $response, $args){
        $response = $response->withAddedHeader('metodo', "Metodo Traer Pedidos GET");
        $ArrayDeParametros = $request->getParsedBody();
        $payload = json_decode($response->getHeader('payload')[0]);
        switch($payload->tipo)
        {
            case "mozos":
                $pedidos = pedido::where([['tipo', 'mozos'],['estado', 'Listo']])->get();
            break;
            case "cerveceros":
                $pedidos = pedido::where([['tipo', 'cerveceros'],['estado', "En espera"]])->get();
            break;
            case "bartender":
                $pedidos = pedido::where([['tipo', 'bartender'],['estado', "En espera"]])->get();
            break;
            case "cocineros":
                $pedidos = pedido::where([['tipo', 'cocineros'],['estado', "En espera"]])->get();
            break;
            default:
                $pedidos = pedido::all();
            break;
        }
        return $response->withJson($pedidos, 200);
    }
   	public function CargarUno($request, $response, $args){
        $response = $response->withAddedHeader('metodo', "Metodo alta pedido POST");
        $ArrayDeParametros = $request->getParsedBody();
        $payload = json_decode($response->getHeader('payload')[0]);
      
        if($payload->tipo == "mozos")
        {
            if(isset($ArrayDeParametros['idMesa']))
            {
                $idMesa = $ArrayDeParametros['idMesa'];
                if(strlen($idMesa) == 0)
                {
                    return $response->withJson("Debe ingresar una idMesa", 401);
                }
            }
            else { 
                return $response->withJson("Debe ingresar una idMesa", 401);
            }

            $codigo = pedidoApi::generarCodigo();
            if(isset($ArrayDeParametros['cerveceros']))
            {
                $pedido= $ArrayDeParametros['cerveceros'];
                if(strlen($pedido) != 0)
                {
                    $carta = carta::where('id', $pedido)->first();
                    if($carta->tipo == 'cerveceros')
                    {  
                        $miPedido = new pedido();
                        $miPedido->tipo="cerveceros";
                        $miPedido->idMesa=$idMesa;
                        $miPedido->estado="En espera";
                        $miPedido->tiempoEstimado="Calculando";
                        $miPedido->importe = $carta->importe;
                        $miPedido->codigo= $codigo;
                        $miPedido->inicio = new DateTime('NOW');
                        $miPedido->save();
                    }else
                    {
                        return $response->withJson("Pedido invalido", 401); 
                    }
                }
            }

            if(isset($ArrayDeParametros['bartender']))
            {
                $pedido= $ArrayDeParametros['bartender'];
                if(strlen($pedido) != 0)
                {
                    $carta = carta::where('id', $pedido)->first();
                    if($carta->tipo == 'bartender')
                    {  
                        $miPedido = new pedido();
                        $miPedido->tipo="bartender";
                        $miPedido->idMesa=$idMesa;
                        $miPedido->estado="En espera";
                        $miPedido->tiempoEstimado="Calculando";
                        $miPedido->importe = $carta->importe;
                        $miPedido->codigo= $codigo;
                        $miPedido->inicio = new DateTime('NOW');
                        $miPedido->save();
                    }else
                    {
                        return $response->withJson("Pedido invalido", 401); 
                    }
                }
            }

            if(isset($ArrayDeParametros['cocineros']))
            {
                $pedido= $ArrayDeParametros['cocineros'];
                if(strlen($pedido) != 0)
                {
                    $carta = carta::where('id', $pedido)->first();
                    if($carta->tipo == 'cocineros')
                    {  
                        $miPedido = new pedido();
                        $miPedido->tipo="cocineros";
                        $miPedido->idMesa=$idMesa;
                        $miPedido->estado="En espera";
                        $miPedido->tiempoEstimado="Calculando";
                        $miPedido->importe = $carta->importe;
                        $miPedido->codigo= $codigo;
                        $miPedido->inicio = new DateTime('NOW');
                        $miPedido->save();
                    }else
                    {
                        return $response->withJson("Pedido invalido", 401); 
                    }
                }
            }   

            

            return $response->withJson("Se cargo correctamente codigo: " . $codigo, 200);
        }else
        {
            return $response->withJson("Solo mozos pueden realizar pedidos", 401);
        }
        return $response->withJson("Entre", 200);
    }
   	public function BorrarUno($request, $response, $args){}
   	public function ModificarUno($request, $response, $args){
        $response = $response->withAddedHeader('metodo', "Metodo modificar pedido POST");
        $ArrayDeParametros = $request->getParsedBody();
        $payload = json_decode($response->getHeader('payload')[0]);

        if(isset($ArrayDeParametros['idPedido']))
        {
            $idPedido = $ArrayDeParametros['idPedido'];
            $pedido = pedido::where('id', $idPedido)->first();
        }
        else
        {
            return $response->withJson("Pedido no encontrado", 401);
        }

        if($pedido->tipo == $payload->tipo)
        {
            if(isset($ArrayDeParametros['tiempoEstimado']))
            {
                $pedido->tiempoEstimado = $ArrayDeParametros['tiempoEstimado'];
            }
            if(isset($ArrayDeParametros['idMesa']))
            {
                $pedido->idMesa = $ArrayDeParametros['idMesa'];
            }
            if(isset($ArrayDeParametros['estado']))
            {
                $pedido->estado = $ArrayDeParametros['estado'];
                if($pedido->estado == "entregado")
                {
                    $pedido->fin = new DateTime('NOW');
                }
            }
            if(isset($ArrayDeParametros['tipo']))
            {
                $pedido->tipo = $ArrayDeParametros['tipo'];
            }
            $pedido->save();
            return $response->withJson("Pedido Modificado", 200);
        }
        else
        {
            return $response->withJson("No puedes modificar un pedido de otro sector", 401);
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
        
        $existe = pedido::where('codigo', $codigo)->first();
        if($existe)
        {
            $codigo = generarCodigo();
        }
        return $codigo;
    }
}

?>