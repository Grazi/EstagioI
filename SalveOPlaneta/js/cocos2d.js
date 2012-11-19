(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, 
        box2d:false, // Não inicializa a física box2d.
        showFPS:true, // Habilita o contador de quadros por segundo.
        frameRate:30,
        tag:'gameCanvas', // Renderiza cocos2d.
        engineDir:'cocos2d/', // Diretório de bibliotecas cocos2d.
        appFiles:['js/SalveOPlaneta.js','js/Aeronave.js','js/Poder.js','js/Meteorito.js', 'js/Inicio.js', 'js/GameOver.js', 'js/VencerGame.js'] // Lista todos os scripts que compõem o jogo.
    };
    window.addEventListener('DOMContentLoaded', function () {
        var s = d.createElement('script');
        s.src = c.engineDir + 'platform/jsloader.js';
        d.body.appendChild(s);
        s.c = c;
        s.id = 'cocos2d-html5';
    });
})();
