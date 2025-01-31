import axios from 'axios';

const handleTrialDownload = () => {
  const apiEndpoint = "http://localhost:5000/api/download/trial";  // Your backend endpoint

  // Make a GET request to the backend to fetch the file
  axios.get(apiEndpoint, { responseType: 'blob' })
    .then(response => {
      // The response data contains the file as a Blob
      const blob = response.data;

      // Create a link element for the download
      const downloadLink = document.createElement('a');
      
      // Create an object URL for the Blob and set it as the link's href
      downloadLink.href = window.URL.createObjectURL(new Blob([blob]));
      
      // Set the filename for the downloaded file
      downloadLink.setAttribute('download', 'test.txt');
      
      // Programmatically click the link to trigger the download
      downloadLink.click();

      // Clean up by removing the link from the DOM
      document.body.removeChild(downloadLink);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

export default handleTrialDownload;