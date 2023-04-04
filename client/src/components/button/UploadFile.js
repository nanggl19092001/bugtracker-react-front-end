import { useState } from "react";

function UploadFile(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("id", props.ticketId);
    try{
        const res = await fetch(`${props.domain}/user/ticket/attachment?token=${props.token}`, {
            method: "POST",
            body: formData,
        });
        const resJson = await res.json();
        if(resJson.status === 200){
            console.log(resJson)
        }else{
            console.log(resJson)
        }
    }catch(error){
      console.log(error)
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default UploadFile;
