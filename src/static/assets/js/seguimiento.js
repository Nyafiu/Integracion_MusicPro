document.getElementById("btn-seguir").addEventListener("click", async () => {
    const codigoSeguimiento = document.getElementById("idSeguimiento").value;
    console.log(codigoSeguimiento)
    const urlApiFlask = `/api/productos/seguimiento/${codigoSeguimiento}`;

    try {
        const response = await fetch(urlApiFlask);

        if (response.ok) {
            const responseData = await response.json();
            const estadoPedido = responseData.estado_pedido;
            alert(`Estado del pedido: ${estadoPedido}`);
        } else {
            throw new Error('Error en la solicitud');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});
