; (function () {
    'use strict'

    var juego = {
        palabra: 'ALURA',
        estado: 7,
        adivinado: ['A', 'L'],
        errado: ['B', 'J', 'K']
    }

    var $html = {
        hombre: document.getElementById('hombre'),
        adivinador: document.querySelector('.adivinador-palabras'),
        errado: document.querySelector('.errado-en-palabras')
    }

    function dibujar(juego) {
        //actualizar la imagen del hombre
        var $elem
        $elem = $html.hombre
        
        var estado = juego.estado
        if (estado === 8) {
            estado = juego.previo
        }
    
        $elem.src = 'imagenes/estados/' + estado + '.png'
        
        //creamos las letras adivinidas, obtenermos palabras y recorremos letras * letras
        var palabra = juego.palabra
        var adivinado = juego.adivinado
        var $elem = $html.adivinador
        //para cada letra de la palabra esta dentos de las listas de letras divinadas
        for (let letra of palabra) {
            let $span = document.createElement('span')
            let $txt = document.createTextNode('')
            //si adivinado contiene la letra  la muestra        
            if (adivinado.indexOf(letra) >= 0) {
                $txt.nodeValue = letra
            }
            //agregamos el texto al span
            $span.setAttribute('class', 'letras adivinada')
            $span.appendChild($txt)
             $elem.appendChild($span)   
        }
        //creamos las letras erradas
        var errado = juego.errado
        $elem = $html.errado
        for (let letra of errado) {
            let $span = document.createElement('span')
            let $txt = document.createTextNode(letra)
            $span.setAttribute('class', 'letras erradas')
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
    }

    function adivinarJuego(juego, letra) {
        var estado = juego.estado
        //si ya se ha perdido, o ganado, no hay nada que hacer
        if (estado == 1 || estado == 8) {
            return
        }
        //si ya hemos adivinado o errado la letra, no hay nada que hacer
        var adivinado = juego.adivinado
        var errado = juego.errado
        if (adivinado.indexOf(letra)>= 0 || errado.indexOf(letra) >= 0) {
            return
        }
        var palabra = juego.palabra
        //si es letra de la palabra 
        if (palabra.indexOf(letra) >= 0) {
            let ganado = true
            //debemos ver si llegamos al estado ganado
            for (let letraCadena of palabra) {
                if (adivinado.indexOf(letraCadena) < 0 && letraCadena != letra) {
                    ganado = false
                    juego.previo = juego.estado
                    break
                }
            }
            //si ya se ha ganado, debemos indicarlo cambiado al estado
            if (ganado) {
                juego.estado = 8
            }
            //agregamos la letra, a la lista de letras adivinadas
            adivinado.push(letra)
        } else {
                //si no es letra de la palabra, debemos actualizar el estado, acercamos al hombre un paso mas de su ahorca
                juego.estado--
                //agregamos la letra, a la lista de letras erradas
                errado.push(letra)
            }   
    }
    
    dibujar(juego);
    
}());

//indexOf = contiene