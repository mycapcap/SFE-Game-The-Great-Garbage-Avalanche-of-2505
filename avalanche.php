<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Great Garbage Avalanche of 2505</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial Black', 'Arial Bold', sans-serif;
            background: linear-gradient(180deg, #8B4513 0%, #D2691E 50%, #CD853F 100%);
            overflow: hidden;
            color: #ff0;
        }

        #gameCanvas {
            display: block;
            width: 100vw;
            height: 100vh;
            cursor: grab;
        }

        #gameCanvas:active {
            cursor: grabbing;
        }

        #ui {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            pointer-events: none;
            z-index: 1000;
        }

        #hud {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 20px;
            pointer-events: auto;
        }

        .hud-panel {
            background: rgba(139, 69, 19, 0.9);
            border: 4px solid #ff0;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(255, 255, 0, 0.5);
            text-shadow: 2px 2px 4px #000;
        }

        #title {
            font-size: 24px;
            font-weight: bold;
            color: #ff0;
            text-transform: uppercase;
        }

        #stats {
            font-size: 16px;
            line-height: 1.5;
        }

        #controls {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(139, 69, 19, 0.9);
            border: 4px solid #ff0;
            padding: 20px;
            border-radius: 10px;
            pointer-events: auto;
            text-align: center;
            box-shadow: 0 0 20px rgba(255, 255, 0, 0.5);
        }

        button {
            background: linear-gradient(180deg, #ff0 0%, #cc0 100%);
            border: 3px solid #000;
            color: #000;
            font-size: 18px;
            font-weight: bold;
            padding: 12px 25px;
            margin: 5px;
            border-radius: 8px;
            cursor: pointer;
            text-transform: uppercase;
            box-shadow: 0 4px 0 #886600;
            transition: all 0.1s;
        }

        button:hover {
            background: linear-gradient(180deg, #ffff00 0%, #dddd00 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 0 #886600;
        }

        button:active {
            transform: translateY(2px);
            box-shadow: 0 2px 0 #886600;
        }

        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        #modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            pointer-events: auto;
        }

        #modal.show {
            display: flex;
        }

        .modal-content {
            background: linear-gradient(180deg, #8B4513 0%, #D2691E 100%);
            border: 6px solid #ff0;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 600px;
            box-shadow: 0 0 50px rgba(255, 255, 0, 0.8);
        }

        .modal-content h1 {
            font-size: 36px;
            color: #ff0;
            margin-bottom: 20px;
            text-shadow: 3px 3px 6px #000;
        }

        .modal-content p {
            font-size: 18px;
            color: #fff;
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px #000;
        }

        #endScreen img {
            max-width: 100%;
            margin: 20px 0;
            border: 3px solid #ff0;
            border-radius: 10px;
        }

        .instruction {
            font-size: 14px;
            color: #ffff99;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas"></canvas>

    <div id="ui">
        <div id="hud">
            <div class="hud-panel">
                <div id="title">The Great Garbage Avalanche of 2505</div>
            </div>
            <div class="hud-panel">
                <div id="stats">
                    <div>Garbage Placed: <span id="garbageCount">0</span></div>
                    <div>Avalanche Progress: <span id="avalancheProgress">0</span>%</div>
                    <div>Current Weight: <span id="currentWeight">0</span>kg</div>
                </div>
            </div>
        </div>
    </div>

    <div id="controls">
        <div class="instruction">
            🖱️ Drag: Rotate | Scroll: Zoom | Click: Place Garbage
        </div>
        <button id="placeDelicate">Place Delicately</button>
        <button id="dropGarbage">Drop It!</button>
        <button id="newGarbage">Get New Garbage</button>
        <button id="resetCamera">Reset Camera</button>
    </div>

    <div id="modal">
        <div class="modal-content">
            <div id="startScreen">
                <h1>The Great Garbage Avalanche of 2505</h1>
                <p>In the year 2505, Rita and Joe are trapped beneath a mountain of garbage...</p>
                <p>Stack garbage strategically to create an avalanche that will free them!</p>
                <p><strong>Controls:</strong></p>
                <p>Drag to rotate view | Scroll to zoom | Position garbage and place it</p>
                <button id="startGame">Start Avalanche</button>
            </div>
            <div id="endScreen" style="display: none;">
                <h1>They're Free!</h1>
                <p id="endMessage"></p>
                <button id="restartGame">Play Again</button>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

    <?php
    $jsFiles = [
        'js/garbageTemplates.js',
        'js/garbageGenerator.js',
        'js/physics.js',
        'js/scene.js',
        'js/controls.js',
        'js/game.js',
        'js/main.js'
    ];

    foreach ($jsFiles as $file) {
        if (file_exists($file)) {
            echo "<script>" . file_get_contents($file) . "</script>\n";
        }
    }
    ?>
</body>
</html>
