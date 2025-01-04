import axios from 'axios';
import Button from 'react-bootstrap/Button';

const DownloadButton = () => {
  const handleButtonClick = () => {
    const apiEndpoint = "http://150.150.82.76:8888/ML/dataset/";
    const params = {
      type: 'IPQC',
    };
 
    axios.get(apiEndpoint, {params, responseType: 'blob'})
      .then(response => {
        const blob = response.data;
 
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([blob]));
        downloadLink.setAttribute('download', 'exportedFile.zip');
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .catch(error=>{
        console.error('Error fetching data:', error);
      })
  };
  return(
    <div>
      {/* <button style = {{backgroundColor: 'green', color: 'black', fontSize: '30px'}} onClick = {handleButtonClick}> Download </button> */}
      <Button variant = "success" onClick = {handleButtonClick} style = {{fontSize: '1.7vh', fontWeight: 'bold', color: 'white'}}> Download </Button>
    </div>
  )
};

export default DownloadButton;