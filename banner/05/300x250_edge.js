/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'bg',
                            type: 'image',
                            rect: ['0px', '0px', '100%', '100%', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"bg.jpg",'0px','0px']
                        },
                        {
                            id: 'KV',
                            type: 'image',
                            rect: ['0px', '0px', '300px', '250px', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"KV.png",'0px','0px']
                        },
                        {
                            id: 'copy1',
                            type: 'image',
                            rect: ['0px', '0px', '100%', '100%', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"copy1.png",'0px','0px']
                        },
                        {
                            id: 'pp',
                            type: 'image',
                            rect: ['0px', '0px', '100%', '100%', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"pp.png",'0px','0px']
                        },
                        {
                            id: 'points',
                            type: 'image',
                            rect: ['0px', '0px', '100%', '100%', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"points.png",'0px','0px']
                        },
                        {
                            id: 'cta',
                            type: 'image',
                            rect: ['0px', '0px', '100%', '100%', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"cta.png",'0px','0px']
                        },
                        {
                            id: 'brand',
                            type: 'image',
                            rect: ['0px', '0px', '100%', '100%', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"brand.png",'0px','0px']
                        },
                        {
                            id: 'border_clickTag',
                            type: 'rect',
                            rect: ['0px', '0px', '99.3%', '99.2%', 'auto', 'auto'],
                            cursor: 'pointer',
                            fill: ["rgba(255,255,255,0.00)"],
                            stroke: [1,"rgba(0,0,0,1.00)","solid"]
                        },
                        {
                            id: 'replay',
                            type: 'image',
                            rect: ['0px', '0px', '45px', '20px', 'auto', 'auto'],
                            cursor: 'pointer',
                            fill: ["rgba(0,0,0,0)",im+"replay.png",'0px','0px']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '300px', '250px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 15000,
                    autoPlay: true,
                    data: [
                        [
                            "eid742",
                            "opacity",
                            9000,
                            500,
                            "linear",
                            "${points}",
                            '0',
                            '1'
                        ],
                        [
                            "eid743",
                            "opacity",
                            13000,
                            500,
                            "linear",
                            "${points}",
                            '1',
                            '0'
                        ],
                        [
                            "eid575",
                            "opacity",
                            14500,
                            500,
                            "linear",
                            "${replay}",
                            '0',
                            '1'
                        ],
                        [
                            "eid608",
                            "left",
                            0,
                            0,
                            "linear",
                            "${replay}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid607",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Stage}",
                            'rgba(255,255,255,1)',
                            'rgba(255,255,255,1)'
                        ],
                        [
                            "eid602",
                            "height",
                            14500,
                            0,
                            "linear",
                            "${replay}",
                            '20px',
                            '20px'
                        ],
                        [
                            "eid747",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${pp}",
                            '0',
                            '0'
                        ],
                        [
                            "eid741",
                            "opacity",
                            4500,
                            500,
                            "linear",
                            "${pp}",
                            '0',
                            '1'
                        ],
                        [
                            "eid738",
                            "opacity",
                            8500,
                            500,
                            "linear",
                            "${pp}",
                            '1',
                            '0'
                        ],
                        [
                            "eid737",
                            "opacity",
                            500,
                            500,
                            "linear",
                            "${copy1}",
                            '0',
                            '1'
                        ],
                        [
                            "eid740",
                            "opacity",
                            4000,
                            500,
                            "linear",
                            "${copy1}",
                            '1',
                            '0'
                        ],
                        [
                            "eid744",
                            "opacity",
                            13500,
                            500,
                            "linear",
                            "${cta}",
                            '0',
                            '1'
                        ],
                        [
                            "eid878",
                            "opacity",
                            0,
                            500,
                            "linear",
                            "${KV}",
                            '0',
                            '1'
                        ],
                        [
                            "eid880",
                            "opacity",
                            8500,
                            500,
                            "linear",
                            "${KV}",
                            '1',
                            '0'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("300x250_edgeActions.js");
})("EDGE-20049058");
