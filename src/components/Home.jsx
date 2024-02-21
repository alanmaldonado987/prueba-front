import { useState } from 'react'
import '../css/Home.css'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import Swal from 'sweetalert2';

function Uploader() {
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
        setImage(file);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");

        const formData = new FormData();
        formData.append('uploadFile', image);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setMessage("Archivo cargado exitosamente");
            } else {
                setMessage("Error al cargar el archivo");
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Archivo Invalido",
                });
            }
        } catch (error) {
            console.error('Error al enviar el archivo:', error);
            setMessage("Error al enviar el archivo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='main'>
            <form
                className='input-form'
                onClick={() => document.querySelector(".input-field").click()}
            >
                <input type="file" accept='image/*' className='input-field' hidden onChange={handleFileChange} />

                {image ?
                    <img src={URL.createObjectURL(image)} width={150} height={150} alt={fileName} />
                    :
                    <>
                        <MdCloudUpload color='#1475cf' size={60} />
                        <p>Browse Files to upload</p>
                    </>
                }
            </form>

            <button onClick={handleSubmit}>
                {loading ? "Cargando..." : "Enviar"}
            </button>

            <section className='uploaded-row'>
                <AiFillFileImage color='#1475cf' />
                <span className='upload-content'>
                    {fileName} -
                    <MdDelete
                        onClick={() => {
                            setFileName("No selected File")
                            setImage(null)
                        }}
                    />
                </span>
            </section>

            {
                message && <div>
                    <p>{message}</p>
                    <button type="button" class="btn btn-primary">Ver Resultados</button>
                </div>
            }
        </main>
    )
}

export default Uploader;
