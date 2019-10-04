function SetNumberOfMatrices() {
    var num_matrices = document.getElementById('num_matrices');
    var n = parseInt(num_matrices.value, 10);

    RemoveAllChildren(document.getElementById('matrix_container'));
    for (let i = 0; i < n; i++) {
        CreateMatrixInput(i);
    }

    var mult_text = document.getElementById('mult_text');
    var text = 'A &middot; B';
    if (n === 3) text += ' &middot; C';
    else if (n === 4) text += ' &middot; C &middot; D';
    mult_text.innerHTML = text;
}

function MultiplyMatrices() {
    var num_matrices = document.getElementById('num_matrices');
    var n = parseInt(num_matrices.value, 10);

    var matrices = [];
    var nrows, ncols;
    for (let i = 0; i < n; i++) {
        nrows = parseInt(document.getElementById('mat' + i + '_nrows').value, 10);
        ncols = parseInt(document.getElementById('mat' + i + '_ncols').value, 10);
        let mat = new Matrix(nrows, ncols);
        let values = [];
        for (let r = 0; r < nrows; r++) {
            let value_row = []
            for (let c = 0; c < ncols; c++) {
                let cell = document.getElementById('mat' + i + '_cell_' + r + '_' + c);
                let num = parseInt(cell.value, 10) || 0;
                value_row.push(num);
            }
            values.push(value_row);
        }
        mat.values = values;
        matrices.push(mat);
    }

    var result;
    if (n === 2) result = Matrix.multiply(matrices[0], matrices[1]);
    else if (n === 3) result = Matrix.multiply(matrices[0], matrices[1], matrices[2]);
    else result = Matrix.multiply(matrices[0], matrices[1], matrices[2], matrices[3]);
    
    var matrix_result = document.getElementById('matrix_result');
    RemoveAllChildren(matrix_result);
    if (result === null) {
        var result_error = document.createElement('h4');
        result_error.textContent = 'Error: could not multiply - row/column mismatch';
        matrix_result.appendChild(result_error);
    }
    else {
        var data = result.values;
        var result_header = document.createElement('h4');
        result_header.textContent = 'Result:';
        var space = document.createElement('div');
        space.className = 'spacer';
        var result_table = document.createElement('table');
        result_table.style.borderCollapse = 'collapse';
        for (let i = 0; i < result.rows; i++) {
            let row = result_table.insertRow(-1);
            for (let j = 0; j < result.columns; j++) {
                let cell = row.insertCell(-1);
                cell.textContent = data[i][j];
                cell.style.border = 'solid 1px #000000';
                cell.style.minWidth = '3rem';
            }
        }

        matrix_result.appendChild(result_header);
        matrix_result.appendChild(space);
        matrix_result.appendChild(result_table);
    }
}

function CreateMatrixInput(index) {
    var matrix_container = document.getElementById('matrix_container');
    var div = document.createElement('div');
    var name = document.createElement('h2');
    name.textContent = 'Matrix ' + String.fromCharCode(65 + index) + ':';
    var n_rows = document.createElement('select');
    n_rows.id = 'mat' + index + '_nrows';
    n_rows.onchange = UpdateMatrixDimensions;
    var row_option1 = document.createElement('option');
    row_option1.textContent = '1';
    row_option1.value = '1';
    var row_option2 = document.createElement('option');
    row_option2.textContent = '2';
    row_option2.value = '2';
    var row_option3 = document.createElement('option');
    row_option3.textContent = '3';
    row_option3.value = '3';
    var row_option4 = document.createElement('option');
    row_option4.textContent = '4';
    row_option4.value = '4';
    n_rows.appendChild(row_option1);
    n_rows.appendChild(row_option2);
    n_rows.appendChild(row_option3);
    n_rows.appendChild(row_option4);
    n_rows.selectedIndex = 2;
    n_rows.style.margin = '0 0.5rem';
    var x = document.createElement('span');
    x.textContent = 'x';
    var n_cols = document.createElement('select');
    n_cols.id = 'mat' + index + '_ncols';
    n_cols.onchange = UpdateMatrixDimensions;
    var col_option1 = document.createElement('option');
    col_option1.textContent = '1';
    col_option1.value = '1';
    var col_option2 = document.createElement('option');
    col_option2.textContent = '2';
    col_option2.value = '2';
    var col_option3 = document.createElement('option');
    col_option3.textContent = '3';
    col_option3.value = '3';
    var col_option4 = document.createElement('option');
    col_option4.textContent = '4';
    col_option4.value = '4';
    n_cols.appendChild(col_option1);
    n_cols.appendChild(col_option2);
    n_cols.appendChild(col_option3);
    n_cols.appendChild(col_option4);
    n_cols.selectedIndex = 2;
    n_cols.style.margin = '0 0.5rem';
    var table = document.createElement('table');
    table.id = 'mat' + index;

    for (let i = 0; i < 3; i++) {
        let row = table.insertRow(-1);
        for (let j = 0; j < 3; j++) {
            let cell = row.insertCell(-1);
            let input = document.createElement('input');
            input.id = 'mat' + index + '_cell_' + i + '_' + j;
            input.type = 'text';
            input.style.width = '2rem';
            cell.appendChild(input);
        }
    }

    div.appendChild(name);
    div.appendChild(n_rows);
    div.appendChild(x);
    div.appendChild(n_cols);
    div.appendChild(table);

    var space = document.createElement('div');
    space.className = 'spacer';

    matrix_container.appendChild(div);
    matrix_container.appendChild(space);
}

function UpdateMatrixDimensions(event) {
    var pos = event.target.id.indexOf('_');
    var index = parseInt(event.target.id.substring(3, pos), 10);
    var nrows = parseInt(document.getElementById('mat' + index + '_nrows').value, 10);
    var ncols = parseInt(document.getElementById('mat' + index + '_ncols').value, 10);

    var table = document.getElementById('mat' + index);
    RemoveAllChildren(table);
    for (let i = 0; i < nrows; i++) {
        let row = table.insertRow(-1);
        for (let j = 0; j < ncols; j++) {
            let cell = row.insertCell(-1);
            let input = document.createElement('input');
            input.id = 'mat' + index + '_cell_' + i + '_' + j;
            input.type = 'text';
            input.style.width = '2rem';
            cell.appendChild(input);
        }
    }
}

function RemoveAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
