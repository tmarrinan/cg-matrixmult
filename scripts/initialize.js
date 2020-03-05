var app;

function Init() {
    var start_vertex = new Vector(4);
    var final_vertex = new Vector(4)
    Vector4(start_vertex, 0, 0, 0, 1);
    Vector4(final_vertex, 0, 0, 0, 1);
    app = new Vue({
        el: '#content',
        data: {
            vertex: start_vertex,
            transforms: [
                {
                    type: 'translate',
                    value: [0, 0, 0],
                    mat4x4: new Matrix(4, 4)
                }
            ],
            compound: new Matrix(4, 4),
            final_vertex: final_vertex,
            types: {
                'translate': 'Translate',
                'scale': 'Scale',
                'rotate_x': 'Rotate X',
                'rotate_y': 'Rotate Y',
                'rotate_z': 'Rotate Z'
            },
            disable_add: false
        }
    });
}

// called whenever user clicks 'Add' button
function AddTransform() {
    if (app.transforms.length < 5) {
        app.transforms.push({
            type: 'translate',
            value: [0, 0, 0],
            mat4x4: new Matrix(4, 4)
        });
    }
    if (app.transforms.length >= 5) {
        app.disable_add = true;
    }
    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}

function RemoveTransform(index) {
    app.transforms.splice(index, 1);
    app.disable_add = false;
    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
