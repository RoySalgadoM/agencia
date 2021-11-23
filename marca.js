const url = "http://localhost:4000/marca";

const getMarcas = () => {
    $.ajax({
        method: "GET",
        url: url
    }).done(function (res) {
        content = "";
        res = res.listMarcas
        for (let i = 0; i < res.length; i++) {
            content += `
                        <tr>
                            <td>${res[i].id}</td>
                            <td>${res[i].nombre}</td>
                            <td>
                                <button type="button" onclick="getMarcaById(${res[i].id})" data-bs-toggle="modal" data-bs-target="#modificarAuto" class="btn btn-outline-primary"><i class="fas fa-edit"></i></button>
                            </td>
                            <td>
                                <button onclick="deleteMarca(${res[i].id})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `;
        }
        $("#table > tbody").html(content);

    });
};

const getMarcaById = async (id) => {
    await $.ajax({
        method: "GET",
        url: url + '/' + id
    }).done(res =>{
        document.getElementById("idM").value = res.marca[0].id;
        document.getElementById("nombreM").value = res.marca[0].nombre;
    });
};

const crearMarca = async() => {
    let marca = new Object();
    marca.nombre = document.getElementById("nombre").value;
    await $.ajax({
        method: "POST",
        url: url + '/create',
        data: marca
    }).done(res =>{
        Swal.fire({
            title: 'La marca ha sido registrada',
            confirmButtonText: 'Recargar tabla de marcas',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getMarcas();
                document.getElementById("nombre").value ="";
                document.getElementById("closeRegister").click();
            }
        })
    });
}

const modificarMarca= async()=>{
    let marca = new Object();
    marca.nombre = document.getElementById("nombreM").value;
    marca.id = document.getElementById("idM").value;
    await $.ajax({
        method: "POST",
        url: url + '/update/'+document.getElementById("idM").value,
        data: marca
    }).done(res =>{
        Swal.fire({
            title: 'La marca ha sido modificada',
            confirmButtonText: 'Recargar la tabla de marcas',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getMarcas();
                document.getElementById("closeModify").click();
            }
        })
    });
}
const deleteMarca= async(id)=>{
    await $.ajax({
        method: "POST",
        url: url + '/delete/'+id
    }).done(res =>{
        Swal.fire({
            title: 'La marca ha sido eliminada',
            confirmButtonText: 'Recargar la tabla de marcas',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getMarcas();
            }
        })
    });
}