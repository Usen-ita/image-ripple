let images = [
  {
    name: "universal.jpg",
    width: 1280,
    height: 720,
  },
  {
    name: "yoga-lady.jpg",
    width: 1280,
    height: 720,
  },
  {
    name: "AbstractPlay1.png",
    width: 480,
    height: 854,
  },
  {
    name: "darkPortraitMan.jpg",
    width: 1280,
    height: 720,
  },
];

    /* Setup of the main image and the displacement filter */
    var index = 0;
    var image = images[index];
    var initTexture = PIXI.Texture.fromImage(image.name);
    var canvasWidth = document.body.offsetWidth ;
    var canvasHeight = document.body.offsetHeight ;
    var app = new PIXI.Application(canvasWidth, canvasHeight, {
        antialias: true,
        transparent: true,
        view: document.querySelector("#canvas")
    });

    app.stage.alpha = 1;
    app.stage.interactive = true;

    var layer2 = PIXI.Sprite.from(initTexture)

    layer2.width = image.width;
    layer2.height = image.height;
    layer2.x = document.body.offsetWidth / 1.4 - layer2.width;
    layer2.y = 0;

    var displacementFilterTexture = PIXI.Sprite.fromImage(
        "disp_map.jpg"
    )

    displacementFilterTexture.width = image.width;
    displacementFilterTexture.height = image.height;
    displacementFilterTexture.x = document.body.offsetWidth / 1.4 - displacementFilterTexture.width;
    displacementFilterTexture.y = 0;

    var mainContainer = new PIXI.Container();

    mainContainer.addChild(displacementFilterTexture);

    var additionalContainer = new PIXI.Container();
    additionalContainer.addChild(layer2);

    var circle = null;

    mainContainer.addChild(additionalContainer);

    var displacementFilter = new PIXI.filters.DisplacementFilter(
        displacementFilterTexture,
        0
    );


    layer2.filters = [displacementFilter];

    app.stage.addChild(mainContainer);

    /* Track the mouse movement */

    setMoveHandlers(app, circle, displacementFilter);

    function setMoveHandlers(app, circle, displacementFilter) {
        app.stage
            .on("mousemove", onPointerMove.bind(circle, displacementFilter))
            .on("touchmove", onPointerMove.bind(circle, displacementFilter));
    }

    function onPointerMove(displacementFilter, eventData) {
        setTilt(
            30,
            eventData.data.global.x,
            eventData.data.global.y,
            displacementFilter
        );
    }

    /* The main effect - move the displacement filter based on the mouse position (we also apply scaling) */

    function setTilt(maxTilt, mouseX, mouseY, displacementFilter) {
        var midpointX = document.body.offsetWidth / 2,
            midpointY = document.body.offsetHeight / 2,
            posX = midpointX - mouseX,
            posY = midpointY - mouseY,
            valX = posX / midpointX * maxTilt,
            valY = posY / midpointY * maxTilt;
        displacementFilter.scale.x = valX;
        displacementFilter.scale.y = valY;
    }

    /* Next button click - load next image and reset displacement filter */

    function next() {
        if (index >= images.length - 1) {
            return;
        }
        else {
            index++
        }
        image = images[index];
        var newTexture = PIXI.Texture.fromImage(image.name);

        layer2.texture = newTexture;
        layer2.width = image.width;
        layer2.height = image.height;
        layer2.x = document.body.offsetWidth / 1.4 - layer2.width;
        layer2.y = 0;

        displacementFilterTexture.width = image.width;
        displacementFilterTexture.height = image.height;
        displacementFilterTexture.x = document.body.offsetWidth / 1.4 - displacementFilterTexture.width;
        displacementFilterTexture.y = 0;
        console.log(image)

    }

    /* Previous button click - load previous image */

    function previous() {
        if (index == 0) {
            return;
        }
        else {
            index--
        }
        image = images[index];
        var newTexture = PIXI.Texture.fromImage(image.name);

        layer2.texture = newTexture;
        layer2.width = image.width;
        layer2.height = image.height;
        layer2.x = document.body.offsetWidth / 1.4 - layer2.width;
        layer2.y = 0;

        displacementFilterTexture.width = image.width;
        displacementFilterTexture.height = image.height;
        displacementFilterTexture.x = document.body.offsetWidth / 1.4 - displacementFilterTexture.width;
        displacementFilterTexture.y = 0;
        console.log(image)

    }