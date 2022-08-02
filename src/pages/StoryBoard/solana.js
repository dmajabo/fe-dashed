const config = {
  w: 1100,
  h: 800,
  canvas: [
    {
        "type": "shape",
        "id": "hr3CMS2TG",
        "index": 1,
        "x": 0,
        "y": 0,
        "w": "1098px",
        "h": "800px",
        "component": "Shape",
        "minWidth": 1,
        "minHeight": 1,
        "props": {
            "background": "#1D202D",
            "borderTopLeftRadius": 20,
            "borderTopRightRadius": 20,
            "borderBottomLeftRadius": 20,
            "borderBottomRightRadius": 20,
            "src": "",
            "img": "/static/media/solana-gradient.dd3db70e8314ea3742ee.png"
        }
    },
    {
        "type": "text",
        "id": "yFupmZu2g",
        "index": 2,
        "x": 317.9999694824219,
        "y": 58,
        "w": "308px",
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#ffffff",
            "fontSize": "31",
            "textAlign": "left",
            "fontWeight": "bold",
            "value": "The Story of"
        },
        "h": "42px"
    },
    {
        "type": "image",
        "id": "7KXT1qT28",
        "index": 3,
        "x": 557.9999694824219,
        "y": 35,
        "width": 300,
        "height": 300,
        "component": "Image",
        "minWidth": 60,
        "minHeight": 80,
        "props": {
            "src": "data:image/png;base64,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",
            "borderTopLeftRadius": 0,
            "borderTopRightRadius": 0,
            "borderBottomLeftRadius": 0,
            "borderBottomRightRadius": 0
        },
        "w": "222px",
        "h": "80px"
    },
    {
        "type": "text",
        "id": "bnLZHHKPz",
        "index": 4,
        "x": 0,
        "y": 110,
        "w": "1100px",
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#1ff0a7",
            "fontSize": "17",
            "textAlign": "center",
            "value": "Solana is a decentralized blockchain built to enable scalable, user-friendly apps for the world."
        },
        "h": "28px"
    },
    {
        "type": "shape",
        "id": "9exI3PaJ9",
        "index": 1,
        "x": 0,
        "y": 737,
        "w": "1098px",
        "h": "63px",
        "component": "Shape",
        "minWidth": 1,
        "minHeight": 1,
        "props": {
            "background": "#14f195",
            "borderTopLeftRadius": "0",
            "borderTopRightRadius": "0",
            "borderBottomLeftRadius": 20,
            "borderBottomRightRadius": 20,
            "src": ""
        }
    },
    {
        "type": "text",
        "id": "NQcEN73Wi",
        "index": 1,
        "x": 21,
        "y": 752,
        "w": 130,
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#000000",
            "fontSize": "14",
            "textAlign": "left",
            "value": "Transactions\nper Second"
        }
    },
    {
        "type": "text",
        "id": "IYn1rH2DI",
        "index": 2,
        "x": 137,
        "y": 752,
        "w": 130,
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#000000",
            "fontSize": "28",
            "textAlign": "left",
            "value": "1,993",
            "fontWeight": "bold"
        }
    },
    {
        "type": "shape",
        "id": "Go-OPVFpw",
        "index": 3,
        "x": 230.99990844726562,
        "y": 738.0001220703125,
        "w": "4px",
        "h": "60px",
        "component": "Shape",
        "minWidth": 1,
        "minHeight": 1,
        "props": {
            "background": "#1D202D",
            "borderTopLeftRadius": "0",
            "borderTopRightRadius": "0",
            "borderBottomLeftRadius": "0",
            "borderBottomRightRadius": "0",
            "src": ""
        }
    },
    {
        "type": "text",
        "id": "oBDVtHf-_",
        "index": 6,
        "x": 246,
        "y": 752,
        "w": 130,
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#000000",
            "fontSize": "14",
            "textAlign": "left",
            "value": "Total\nTransactions"
        }
    },
    {
        "type": "text",
        "id": "l91-fDYOw",
        "index": 10,
        "x": 355.0000305175781,
        "y": 752,
        "w": "291px",
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#000000",
            "fontSize": "26",
            "textAlign": "left",
            "value": "87,062,000,000",
            "fontWeight": "bold",
            "countUp": true,
        },
        "h": "47px"
    },
    {
        "type": "shape",
        "id": "AzzttPekr",
        "index": 11,
        "x": 598.9999694824219,
        "y": 737,
        "w": "4px",
        "h": "61px",
        "component": "Shape",
        "minWidth": 1,
        "minHeight": 1,
        "props": {
            "background": "#1D202D",
            "borderTopLeftRadius": 20,
            "borderTopRightRadius": 20,
            "borderBottomLeftRadius": 20,
            "borderBottomRightRadius": 20,
            "src": ""
        }
    },
    {
        "type": "text",
        "id": "iWsO7A20d",
        "index": 13,
        "x": 610.9999694824219,
        "y": 752,
        "w": "287px",
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#000000",
            "fontSize": "14",
            "textAlign": "left",
            "value": "Avg. cost\nper transaction"
        },
        "h": "40px"
    },
    {
        "type": "text",
        "id": "Egy3CCHA9",
        "index": 14,
        "x": 744.0000915527344,
        "y": 757.9999389648438,
        "w": "220px",
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#000000",
            "fontSize": "28",
            "textAlign": "left",
            "value": "$0.00025",
            "fontWeight": "bold"
        },
        "h": "29px"
    },
    {
        "type": "text",
        "id": "iz853srhK",
        "index": 15,
        "x": 926.9999694824219,
        "y": 752,
        "w": "80px",
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#000000",
            "fontSize": "14",
            "textAlign": "left",
            "value": "Validator\nnodes"
        },
        "h": "auto"
    },
    {
        "type": "shape",
        "id": "gUjqdX_WX",
        "index": 16,
        "x": 916.9999694824219,
        "y": 738,
        "w": "4px",
        "h": "60px",
        "component": "Shape",
        "minWidth": 1,
        "minHeight": 1,
        "props": {
            "background": "#1D202D",
            "borderTopLeftRadius": 20,
            "borderTopRightRadius": 20,
            "borderBottomLeftRadius": 20,
            "borderBottomRightRadius": 20,
            "src": ""
        }
    },
    {
        "type": "text",
        "id": "wB6DUaZiG",
        "index": 17,
        "x": 1003.9999694824219,
        "y": 751,
        "w": "90px",
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#000000",
            "fontSize": "28",
            "textAlign": "left",
            "value": "1,878",
            "fontWeight": "bold"
        },
        "h": "auto"
    },
    {
        "type": "text",
        "id": "SB4dJImti",
        "index": 2,
        "x": 30.999969482421875,
        "y": 214.20001220703125,
        "w": "412px",
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#ffffff",
            "fontSize": "14",
            "textAlign": "left",
            "value": "Created in 2019, Solana is a layer 1 blockchain that allows for high-speed transactions, and is designed for mainstream adoption."
        },
        "h": "auto"
    },
    {
        "type": "text",
        "id": "tiAcvTZeq",
        "index": 3,
        "x": 32.999908447265625,
        "y": 308,
        "w": "415px",
        "component": "Text",
        "minWidth": 10,
        "minHeight": 10,
        "props": {
            "color": "#ffffff",
            "fontSize": "14",
            "textAlign": "left",
            "value": "One of the breakaways success stories of the bull run, SOL has seen growth of over 10,000% and has one of the largest and most active developers communities in crypto.\n"
        },
        "h": "auto"
    }
]
}

export default config