const url = "http://localhost:4000/auto";

const getAutos = () => {
    $.ajax({
        method: "GET",
        url: url
    }).done(function (res) {
        content = "";
        res = res.listAutos
        for (let i = 0; i < res.length; i++) {
            content += `
                        <tr>
                            <td>${res[i].id}</td>
                            <td>${res[i].nombre}</td>
                            <td>${res[i].matricula}</td>
                            <td>${res[i].verificacion}</td>
                            <td>${res[i].fecha_registro}</td>
                            <td>${res[i].fecha_actualizacion}</td>
                            <td>${res[i].estado ==1?"Activo":"Inactivo"} </td>
                            <td>${res[i].marca} </td>
                            <td>
                                <button type="button" onclick="getAutoById(${res[i].id})" data-bs-toggle="modal" data-bs-target="#modificarAuto" class="btn btn-outline-primary"><i class="fas fa-edit"></i></button>
                            </td>
                            <td>
                                <button onclick="deleteAuto(${res[i].id})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `;
        }
        $("#table > tbody").html(content);

    });
};

const getAutoById = async (id) => {
    await $.ajax({
        method: "GET",
        url: url + '/' + id
    }).done(res =>{
        document.getElementById("idM").value = res.auto[0].id;
        document.getElementById("nombreM").value = res.auto[0].nombre;
        document.getElementById("matriculaM").value = res.auto[0].matricula;
        document.getElementById("verificacionM").value = res.auto[0].verificacion;
        document.getElementById("statusM").value = res.auto[0].estado;
        document.getElementById("idMarcaM").value =res.auto[0].marca;
    });
};

const crearAuto = async() => {
    let auto = new Object();
    auto.nombre = document.getElementById("nombre").value;
    auto.matricula = document.getElementById("matricula").value;
    auto.verificacion = document.getElementById("verificacion").value;
    auto.estado = document.getElementById("status").value;
    auto.marca = document.getElementById("idMarca").value;
    await $.ajax({
        method: "POST",
        url: url + '/create',
        data: auto
    }).done(res =>{
        Swal.fire({
            title: 'El carro ha sido registrado',
            confirmButtonText: 'Recargar tabla de autos',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getAutos();
                document.getElementById("nombre").value ="";
                document.getElementById("matricula").value="";
                document.getElementById("verificacion").value="";
                document.getElementById("status").value="";
                document.getElementById("idMarca").value="";
                document.getElementById("closeRegister").click();
            }
        })
    });
}

const modificarAuto= async()=>{
    let auto = new Object();
    auto.nombre = document.getElementById("nombreM").value;
    auto.matricula = document.getElementById("matriculaM").value;
    auto.verificacion = document.getElementById("verificacionM").value;
    auto.estado = document.getElementById("statusM").value;
    auto.marca = document.getElementById("idMarcaM").value;
    auto.id = document.getElementById("idM").value;
    await $.ajax({
        method: "POST",
        url: url + '/update/'+document.getElementById("idM").value,
        data: auto
    }).done(res =>{
        Swal.fire({
            title: 'El auto ha sido modificado',
            confirmButtonText: 'Recargar la tabla de autos',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getAutos();
                document.getElementById("closeModify").click();
            }
        })
    });
}
const deleteAuto= async(id)=>{
    await $.ajax({
        method: "POST",
        url: url + '/delete/'+id
    }).done(res =>{
        Swal.fire({
            title: 'El auto ha sido eliminado',
            confirmButtonText: 'Recargar la tabla de autos',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getAutos();
            }
        })
    });
}