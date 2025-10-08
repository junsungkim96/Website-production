import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/QblackAI_logo_black.png';
import sidebarIcon from '../../img/simulate/sidebar-left.svg';
import camera from '../../img/simulate/dslr-camera.png';
import lens from '../../img/simulate/optics.png';
// import sensor from '../../img/simulate/microchip.png';
import PlanModal from './UI/PlanModal';

import newpage from '../../img/simulate/new-file.svg';
import run from '../../img/simulate/run.svg';
import save from '../../img/simulate/save.svg';
import back from '../../img/simulate/arrow-left.svg';
import forward from '../../img/simulate/arrow-right.svg';
import stop from '../../img/simulate/stop.svg';
import parameter from '../../img/simulate/parameter.svg';
import spectrum from '../../img/simulate/spectrum.svg';
import upload from '../../img/simulate/upload.svg';
import brightness from '../../img/simulate/brightness.svg';

import IlluminantDialogCustom from './UI/illuminant_luminance_custom';
import IlluminantLuminanceDialog from './UI/illuminant_luminance';
import SpectrumPlot from './UI/spectrum';
import SceneLuminanceDialog from './UI/scene_luminance';
import MacbethDialog from './UI/scene_macbeth_input';
import PointArrayDialog from './UI/scene_pointarray_input';
import GridlinesDialog from './UI/scene_gridline_input';
import RingsRaysDialog from './UI/scene_ringsrays_input';
import SlantedEdgeDialog from './UI/scene_slantededge_input';
import SceneFileDialog from './UI/scene_file_input';
import SensorDialog from './UI/sensor_input';
import ISPDialog from './UI/isp_input';

import OpticsDesign from './Optics';

import Joyride, {STATUS} from "react-joyride";

import { API_BASE_URL } from '../../config';


const Simulate = () => {
  const [tutorialSteps, setTutorialSteps] = useState([]);
  const [runTour, setRunTour] = useState(false);
  const [showStageMenu, setShowStageMenu] = useState(false);

  const stages = ["Scene", "Optics", "Sensor", "ISP", "Algorithms"];

  const stageStepsMap = {
    Scene: [
      { target: "#illuminant-select", content: "Choose an illuminant.", placement: "bottom" },
      { target: "#illuminant-param-select", content: (<div>Enter either photons (or energy) <br />or luminance (try a value of 100).</div>), placement: "bottom" },
      { target: "#illuminant-spectrum-select", content: (<div>Preview the spectrum profile.<br />You can skip this one.</div>), placement: "bottom" },
      { target: "#scene-select", content: "Choose a scene.", placement: "bottom" },
      { target: "#scene-param-select", content: (<div>Adjust scene parameters.<br/><br/> Diagonal FoV (calculated from HFoV) must be smaller than optics FoV. This will be checked after optics selection.</div>), placement: "bottom" },
      { target: "#scene-luminance-select", content: (<div>Set scene luminance (try a value of 100).<br/>Skip if illuminant luminance is already defined.</div>), placement: "bottom" },
      { target: "#run-button", content: "Run the simulation.", placement: "bottom" }
    ],
    Optics: [
      { target: "#illuminant-select", content: "Choose an illuminant.", placement: "bottom" },
      { target: "#illuminant-param-select", content: (<div>Enter either photons (or energy) <br />or luminance (try a value of 100).</div>), placement: "bottom" },
      { target: "#illuminant-spectrum-select", content: (<div>Preview the spectrum profile.<br />You can skip this one.</div>), placement: "bottom" },
      { target: "#scene-select", content: "Choose a scene.", placement: "bottom" },
      { target: "#scene-param-select", content: (<div>Adjust scene parameters.<br/><br/> Diagonal FoV (calculated from HFoV) must be smaller than optics FoV. This will be checked after optics selection.</div>), placement: "bottom" },
      { target: "#scene-luminance-select", content: (<div>Set scene luminance (try a value of 100).<br/>Skip if illuminant luminance is already defined.</div>), placement: "bottom" },
      { target: "#optics-select", content: "Pick a pre-designed optic.", placement: "bottom" },
      { target: "#run-button", content: "Run the simulation.", placement: "bottom" }
    ],
    Sensor: [
      { target: "#illuminant-select", content: "Choose an illuminant.", placement: "bottom" },
      { target: "#illuminant-param-select", content: (<div>Enter either photons (or energy) <br />or luminance (try a value of 100).</div>), placement: "bottom" },
      { target: "#illuminant-spectrum-select", content: (<div>Preview the spectrum profile.<br />You can skip this one.</div>), placement: "bottom" },
      { target: "#scene-select", content: "Choose a scene.", placement: "bottom" },
      { target: "#scene-param-select", content: (<div>Adjust scene parameters.<br/><br/> Diagonal FoV (calculated from HFoV) must be smaller than optics FoV. This will be checked after optics selection.</div>), placement: "bottom" },
      { target: "#scene-luminance-select", content: (<div>Set scene luminance (try a value of 100).<br/>Skip if illuminant luminance is already defined.</div>), placement: "bottom" },
      { target: "#optics-select", content: "Pick a pre-designed optic.", placement: "bottom" },
      { target: "#sensor-select", content: "Select a sensor type.", placement: "bottom" },
      { target: "#sensor-param-select", content: "Configure the sensor parameters.", placement: "bottom" },
      { target: "#run-button", content: "Run the simulation.", placement: "bottom" }
    ],
    ISP: [
      { target: "#illuminant-select", content: "Choose an illuminant.", placement: "bottom" },
      { target: "#illuminant-param-select", content: (<div>Enter either photons (or energy) <br />or luminance (try a value of 100).</div>), placement: "bottom" },
      { target: "#illuminant-spectrum-select", content: (<div>Preview the spectrum profile.<br />You can skip this one.</div>), placement: "bottom" },
      { target: "#scene-select", content: "Choose a scene.", placement: "bottom" },
      { target: "#scene-param-select", content: (<div>Adjust scene parameters.<br/><br/> Diagonal FoV (calculated from HFoV) must be smaller than optics FoV. This will be checked after optics selection.</div>), placement: "bottom" },
      { target: "#scene-luminance-select", content: (<div>Set scene luminance (try a value of 100).<br/>Skip if illuminant luminance is already defined.</div>), placement: "bottom" },
      { target: "#optics-select", content: "Pick a pre-designed optic.", placement: "bottom" },
      { target: "#sensor-select", content: "Select a sensor type.", placement: "bottom" },
      { target: "#sensor-param-select", content: "Configure the sensor parameters.", placement: "bottom" },
      { target: "#isp-select", content: "Select an ISP algorithm.", placement: "bottom" },
      { target: "#isp-param-select", content: "Fine-tune ISP parameters.", placement: "bottom" },
      { target: "#run-button", content: "Run the simulation.", placement: "bottom" }
    ],
    Algorithms: [
      { target: "#illuminant-select", content: "Choose an illuminant.", placement: "bottom" },
      { target: "#illuminant-param-select", content: (<div>Enter either photons (or energy) <br />or luminance (try a value of 100).</div>), placement: "bottom" },
      { target: "#illuminant-spectrum-select", content: (<div>Preview the spectrum profile.<br />You can skip this one.</div>), placement: "bottom" },
      { target: "#scene-select", content: "Choose a scene.", placement: "bottom" },
      { target: "#scene-param-select", content: (<div>Adjust scene parameters.<br/><br/> Diagonal FoV (calculated from HFoV) must be smaller than optics FoV. This will be checked after optics selection.</div>), placement: "bottom" },
      { target: "#scene-luminance-select", content: (<div>Set scene luminance (try a value of 100).<br/>Skip if illuminant luminance is already defined.</div>), placement: "bottom" },
      { target: "#optics-select", content: "Pick a pre-designed optic.", placement: "bottom" },
      { target: "#sensor-select", content: "Select a sensor type.", placement: "bottom" },
      { target: "#sensor-param-select", content: "Configure the sensor parameters.", placement: "bottom" },
      { target: "#isp-select", content: "Select an ISP algorithm.", placement: "bottom" },
      { target: "#isp-param-select", content: "Fine-tune ISP parameters.", placement: "bottom" },
      { target: "#algorithm-select", content: "Choose an AI algorithm.", placement: "bottom" },
      { target: "#run-button", content: "Run the full simulation.", placement: "bottom" }
    ]
  };

  const startTutorial = (stage) => {
    setTutorialSteps(stageStepsMap[stage]);
    setRunTour(true);
    setShowStageMenu(false);
  };


  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('System Optimization');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [logoHovered, setLogoHovered] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);

  const [resultImage, setResultImage] = useState(null);
  const [outputText, setOutputText] = useState([]);

  const menuItems = [
    { name: 'System Optimization', icon: camera },
    { name: 'Optics Design', icon: lens },
    // { name: 'Sensor Design', icon: sensor },
  ];

  const [currentUser, setCurrentUser] = useState(localStorage.getItem('userFirstName') || '');
  const [currentPlan, setCurrentPlan] = useState(localStorage.getItem('userPlan') || '');

  const [showPlanModal, setShowPlanModal] = useState(false);
  const userRef = useRef(null);

  const menuRefs = useRef([]);
  const abortControllerRef = useRef(null);
  const logoSize = 35;
  const toggleSize = 25;

  useEffect(() => {
    setSidebarWidth(sidebarExpanded ? 220 : 60);
  }, [sidebarExpanded]);

  const handleToggle = () => {
    setSidebarExpanded(prev => !prev);
  };

  const illuminants = ["", "Custom", "D50", "D55", "D65", "D75", "Illuminant A", "Illuminant B", "Illuminant C", "Fluorescent", "Tungsten"];
  const scenes = ["", "Macbeth", "Point Array", "Gridlines", "Slanted Edge", "Rings Rays", "apple.jpg"];
  const optics = ["", "Cooke Triplet", "Double-Gauss", "Fisheye"];
  const sensors = ["", "Bayer-grbg", "Bayer-rggb", "Bayer-bggr", "Bayer-gbrg"];
  const isps = ["", "Fast-openISP"];
  const algorithms = ["", "DETR", "MiDaS_DPT_Small"];

  // Main UI logic

  // Illuminant
  const [isIlluminantLuminanceDialogOpen, setIsIlluminantLuminanceDialogOpen] = useState(false);
  const [selectedIlluminant, setSelectedIlluminant] = useState('');
  const [illuminantLuminanceValue, setIlluminantLuminanceValue] = useState('');

  const [customIlluminantData, setCustomIlluminantData] = useState(
    Array.from({length: 31}, () => ["",""])
  )

  const IlluminantLuminanceSubmit = (value) => { 
    setIlluminantLuminanceValue(value);
  }

  const IlluminantCustomSubmit = (value) =>{
    setCustomIlluminantData(value);
  }

  const openSpectrumPopup = async (selectedIlluminant, illuminantLuminanceValue, customIlluminantData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/get_illuminant`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          illuminant: selectedIlluminant,
          illuminantLuminance: illuminantLuminanceValue,
          photonValues: customIlluminantData.map(row => Number(row[0]))
        }),
      });

      const illuminant = await response.json();

      // 데이터 확인
      const { wave, energy } = illuminant;
      if (!wave || !energy) {
        console.warn("wave or energy is missing");
        return;
      }
      SpectrumPlot(wave, energy);

    } catch (err) {
      console.error("Failed to fetch illuminant data:", err);
    }
  };


  // Scene
  const [isSceneLuminanceDialogOpen, setIsSceneLuminanceDialogOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedScene, setSelectedScene] = useState('');
  const [sceneFile, setSceneFile] = useState('');
  const [sceneLuminanceValue, setSceneLuminanceValue] = useState('');

  const [isMacbethDialogOpen, setIsMacbethDialogOpen] = useState(false);
  const [isPointArrayDialogOpen, setIsPointArrayDialogOpen] = useState(false);
  const [isGridlineDialogOpen, setIsGridlineDialogOpen] = useState(false);
  const [isSlantedEdgeDialogOpen, setIsSlantedEdgeDialogOpen] = useState(false);
  const [isRingsRaysDialogOpen, setIsRingsRaysDialogOpen] = useState(false);
  const [isSceneFileDialogOpen, setIsSceneFileDialogOpen] = useState(false);

  const [macbethParams, setMacbethValues] = useState({'hfov': 10, 'patchSize': 16});
  const [pointarrayParams, setPointArrayValues] = useState({'hfov': 10, 'arraySize': 128, 'pointSpacing': 16});
  const [gridlinesParams, setGridlinesValues] = useState({'hfov': 10, 'gridlineSize': 128, 'lineSpacing': 16, 'lineThickness': 1});
  const [slantededgeParams, setSlantededgeValues] = useState({'hfov': 10, 'imageSize': 128, 'edgeAngle': 2.6, 'darkLevel': 0});
  const [ringsraysParams, setRingsraysValues] = useState({'hfov': 10, 'radialFreq': 8, 'size': 128});
  const [sceneFileParams, setSceneFileValues] = useState({'hfov': 10, 'illuminant': ''});
  const [sceneFileIlluminantData, setSceneFileIlluminantData] = useState(
    Array.from({length: 31}, () => ["",""])
  )

  const sceneIlluminantSubmit = (value) => {
    setSceneFileIlluminantData(value);
  }

  const sceneButtonClick = () => {
    if (selectedScene === '') return;
    else if (selectedScene === 'Macbeth') setIsMacbethDialogOpen(true);
    else if (selectedScene === 'Point Array') setIsPointArrayDialogOpen(true);
    else if (selectedScene === 'Gridlines') setIsGridlineDialogOpen(true);
    else if (selectedScene === 'Slanted Edge') setIsSlantedEdgeDialogOpen(true);
    else if (selectedScene === 'Rings Rays') setIsRingsRaysDialogOpen(true);
    else setIsSceneFileDialogOpen(true);
  };

  const SceneLuminanceSubmit = (value) => {
    setSceneLuminanceValue(value);
  }

  const handleMacbethSubmit = (values) => {
    setMacbethValues(values);
    fovCheck({macbeth: values});
  }

  const handlePointArraySubmit = (values) => {
    setPointArrayValues(values);
    fovCheck({pointarray: values});
  }

  const handleGridlinesSubmit = (values) =>{
    setGridlinesValues(values);
    fovCheck({gridlines: values});
  }

  const handleSlantededgeSubmit = (values) => {
    setSlantededgeValues(values);
    fovCheck({slantededge: values});
  }

  const handleRingsraysSubmit = (values) => {
    setRingsraysValues(values);
    fovCheck({ringsrays: values});
  }

  const handleSceneFileSubmit = (values) => {
    setSceneFileValues(values);
    fovCheck({sceneFile: values});
  }

  // Optics 
  const [selectedOptics, setSelectedOptics] = useState('');
  const [opticsFile, setOpticsFile] = useState('');

  // Sensor
  const [isSensorDialogOpen, setIsSensorDialogOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState('');
  const [sensorValues, setSensorValues] = useState({
      voltage_swing: "1.15",          // Voltage Swing (V)
      well_capacity: "9000",          // Well Capacity (e)
      fill_factor: "0.45",            // Fill Factor
      pixel_size: "2.2",              // Pixel Size (µm)
      dark_voltage: "10",             // Dark Voltage (µV/s)
      read_noise: "0.96",             // Read Noise (mV)
      prnu: "0.2218",                 // PRNU (%)
      dsnu: "1",                      // DSNU (mV)
      analog_gain: "1",               // Analog Gain
      analog_offset: "0",             // Analog Offset
      rows: "450",                    // Rows
      cols: "650",                    // Cols
  });

  const handleSensorSubmit = (values) => {
    setSensorValues(values);
  }

  // ISP
  const [isIspDialogOpen, setIsIspDialogOpen] = useState(false);
  const [selectedISP, setSelectedISP] = useState('');
  const [ispValues, setIspValues] = useState({
    // DPC
    dpcEnabled: true,
    dpcValue: '30',

    // BLC
    blcEnabled: true,
    blcR: '0',
    blcGr: '0',
    blcGb: '0',
    blcB: '0',
    blcalpha: '0',
    blcbeta: '0',

    // AAF
    aafEnabled: true,

    // AWB
    awbEnabled: true,
    awbR: '1400',
    awbGr: '1200',
    awbGb: '1200',
    awbB: '5000',

    // CNF
    cnfEnabled: true,
    cnfValue: '0',

    // CFA
    cfaEnabled: true,
    cfaType: 'malvar',

    // CCM
    ccmEnabled: true,
    ccmValues: [
      ['0', '0', '2000', '0'],
      ['0', '2000', '0', '0'],
      ['2000', '0', '0', '0'],
    ],

    // GAC
    gacEnabled: true,
    gacGain: '256',
    gacOffset: '0.8',

    // CSC
    cscEnabled: true,

    // NLM
    nlmEnabled: true,
    nlmRadius: '9',
    nlmSigma: '3',
    nlmHeight: '10',

    // BNF
    bnfEnabled: true,
    bnfDistTh: '1.0',
    bnfNormGain: '1.0',

    // CEH
    cehEnabled: true,
    cehGain: '4,6',
    cehOffset: '0.01',

    // EEH
    eehEnabled: true,
    eehGain: '384',
    eehOffset: '100',
    eehEdgeThreshold: '4',
    eehDeltaThreshold: '1000',

    // FCS
    fcsEnabled: true,
    fcsGain: '8',
    fcsOffset: '32',

    // HSC
    hscEnabled: true,
    hscHueOffset: '0',
    hscSaturationGain: '256',

    // BCC
    bccEnabled: true,
    bccBrightnessOffset: '0',
    bccContrastGain: '256',

    // SCL
    sclEnabled: false,
    sclWidth: '1920',
    sclHeight: '1080',      
    });

  const handleISPSubmit = (values) => {
    setIspValues(values);
  }

  // Algorithms
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [algorithmFile, setAlgorithmFile] = useState('');

  
  // UI buttons

  const handleNewPage = () => {
    detectDevice();
  
    // Illuminant
    setSelectedIlluminant('');
    setIlluminantLuminanceValue('');
    setCustomIlluminantData([...Array(31)].map(()=> ["", ""]));
    
    // Scene
    setSelectedScene('');
    setSceneLuminanceValue('');
    setMacbethValues({
      hfov: 10,
      patchSize: 16
    });
    setPointArrayValues({
      hfov: 10,
      arraySize: 128,
      pointSpacing: 16
    });
    setGridlinesValues({
      hfov: 10,
      gridlineSize: 128,
      lineSpacing: 16,
      lineThickness: 1
    });
    setSlantededgeValues({
      hfov: 10,
      imageSize: 128,
      edgeAngle: 2.6,
      darkLevel: 0
    });
    setRingsraysValues({
      hfov: 10,
      radialFreq: 8,
      size: 128
    });
    setSceneLuminanceValue('');
    setSceneFileValues({'hfov': 10, 'illuminant': ''});
    setSceneFileIlluminantData(Array.from({length: 31}, () => ["",""]));

    // Optics
    setSelectedOptics('');
    setOpticsFile('');

    // Sensor
    setSelectedSensor('');
    setSensorValues({
      voltage_swing: "1.15",          // Voltage Swing (V)
      well_capacity: "9000",          // Well Capacity (e)
      fill_factor: "0.45",            // Fill Factor
      pixel_size: "2.2",              // Pixel Size (µm)
      dark_voltage: "10",             // Dark Voltage (µV/s)
      read_noise: "0.96",             // Read Noise (mV)
      prnu: "0.2218",                 // PRNU (%)
      dsnu: "1",                      // DSNU (mV)
      analog_gain: "1",               // Analog Gain
      analog_offset: "0",             // Analog Offset
      rows: "450",                    // Rows
      cols: "650",                    // Cols
    })

    // ISP
    setSelectedISP('');
    setIspValues({
    // DPC
    dpcEnabled: true,
    dpcValue: '30',

    // BLC
    blcEnabled: true,
    blcR: '0',
    blcGr: '0',
    blcGb: '0',
    blcB: '0',
    blcalpha: '0',
    blcbeta: '0',

    // AAF
    aafEnabled: true,

    // AWB
    awbEnabled: true,
    awbR: '1400',
    awbGr: '1200',
    awbGb: '1200',
    awbB: '5000',

    // CNF
    cnfEnabled: true,
    cnfValue: '0',

    // CFA
    cfaEnabled: true,
    cfaType: 'malvar',

    // CCM
    ccmEnabled: true,
    ccmValues: [
      ['0', '0', '2000', '0'],
      ['0', '2000', '0', '0'],
      ['2000', '0', '0', '0'],
    ],

    // GAC
    gacEnabled: true,
    gacGain: '256',
    gacOffset: '0.8',

    // CSC
    cscEnabled: true,

    // NLM
    nlmEnabled: true,
    nlmRadius: '9',
    nlmSigma: '3',
    nlmHeight: '10',

    // BNF
    bnfEnabled: true,
    bnfDistTh: '1.0',
    bnfNormGain: '1.0',

    // CEH
    cehEnabled: true,
    cehGain: '4,6',
    cehOffset: '0.01',

    // EEH
    eehEnabled: true,
    eehGain: '384',
    eehOffset: '100',
    eehEdgeThreshold: '4',
    eehDeltaThreshold: '1000',

    // FCS
    fcsEnabled: true,
    fcsGain: '8',
    fcsOffset: '32',

    // HSC
    hscEnabled: true,
    hscHueOffset: '0',
    hscSaturationGain: '256',

    // BCC
    bccEnabled: true,
    bccBrightnessOffset: '0',
    bccContrastGain: '256',

    // SCL
    sclEnabled: false,
    sclWidth: '1920',
    sclHeight: '1080',      
    })

    // Algorithms
    setSelectedAlgorithm('');
    setAlgorithmFile('');

    // Image
    setResultImage(null);

    // Text
    setOutputText([]);
  }

  const outputTextRef = useRef(null);

  useEffect(()=>{
    if (outputTextRef.current){
      outputTextRef.current.scrollTop = outputTextRef.current.scrollHeight;
    }
  }, [outputText])

  const fovCheck = ({
    macbeth = macbethParams,
    pointarray = pointarrayParams,
    gridlines = gridlinesParams,
    slantededge = slantededgeParams,
    ringsrays = ringsraysParams,
    sceneFile = sceneFileParams,
  } = {}) => {
    if (!(selectedScene && selectedOptics)) return;

    const payload = {
      selectedScene,
      sceneFile: "",
      selectedOptics,
      macbethParams: macbeth,
      pointarrayParams: pointarray,
      gridlinesParams: gridlines,
      slantededgeParams: slantededge,
      ringsraysParams: ringsrays,
      sceneFileParams: sceneFile,
    };

    fetch(`${API_BASE_URL}/fov_check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        data.forEach((line) => {
          const jsonData = JSON.parse(line);
          if (jsonData.type === "log") {
            setOutputText((prev) => [...prev, jsonData.content]);
          }
        });
        setOutputText((prev) => [...prev, "\n"]);
      })
      .catch((err) => console.error("FOV check error:", err));
  };

  useEffect(()=>{
    fovCheck();
  }, [selectedScene, selectedOptics]);

  const detectDevice = () => {
    fetch(`${API_BASE_URL}/get_device`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.device === 'cuda') {
          setOutputText(['Using GPU for calculation']);
          setOutputText((prev) => [...prev, "\n"]);
        } else if (data.device === 'cpu') {
          setOutputText(['Using CPU for calculation\n']);
          setOutputText((prev) => [...prev, "\n"]);
        }
      })
      .catch((err) => {
        console.error(err);
        setOutputText('Compute resource not available');
      });
  }

  useEffect(()=>{
    detectDevice();
  }, []);

  // const handleSave = async() => {
    
  // }

  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  const handleRunSimulation = async () => {
    setIsSimulationRunning(true);
    setResultImage(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Extract only the photon values
    const photonValues = customIlluminantData.map(row => Number(row[0]));

    try {
      const response = await fetch(`${API_BASE_URL}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          illuminant: selectedIlluminant,
          illuminantLuminance: illuminantLuminanceValue,
          illuminantCustomPhotons: photonValues,
          scene: selectedScene,
          sceneFile: sceneFile,
          sceneLuminance: sceneLuminanceValue,
          macbethParams: macbethParams,
          pointarrayParams: pointarrayParams,
          gridlinesParams: gridlinesParams,
          slantededgeParams: slantededgeParams,
          ringsraysParams: ringsraysParams,
          sceneFileParams: sceneFileParams,
          sceneFileIlluminantData: sceneFileIlluminantData,
          optics: selectedOptics,
          sensor: selectedSensor,
          sensorParams: sensorValues,
          isp: selectedISP,
          ispParams: ispValues,
          algorithm: selectedAlgorithm
        }),
        signal: controller.signal
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = '';

      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        buffer += decoder.decode(value || new Uint8Array(), { stream: true });

        let lines = buffer.split('\n');
        buffer = lines.pop(); // 마지막 라인은 아직 완전하지 않을 수 있으므로 버퍼에 남김

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const jsonData = JSON.parse(line);
            if (jsonData.type === "log") {
              setOutputText(prev => [...prev, jsonData.content]);
            } else if (jsonData.type === "result") {
              setResultImage(jsonData.content);
            }
          } catch (err) {
            console.warn("Invalid JSON chunk skipped:", line);
          }
        }
      }

      // 마지막 남은 버퍼 처리
      if (buffer.trim()) {
        try {
          const jsonData = JSON.parse(buffer);
          if (jsonData.type === "log") setOutputText(prev => [...prev, jsonData.content]);
          else if (jsonData.type === "result") setResultImage(jsonData.content);
        } catch (err) {
          console.warn("Invalid JSON chunk at end skipped:", buffer);
        }
      }
      setOutputText(prev => [...prev, "\n"]);

    } catch (error) {
      if (error.name === "AbortError") return;
      console.error(error);
      setOutputText(prev => [...prev, "Simulation failed:" + error.message]);
    } finally {
      if (!abortControllerRef.current.aborted){
        setIsSimulationRunning(false);
      }
    }
  };


  const handleStopSimulation = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setOutputText(prev => [...prev, "\n", "🚩 Terminating simulation...", "Wait until start message appears"]);
      setIsSimulationRunning(true);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/stop`, { method: "POST" });
      const data = await response.json();

      if (data.status === "stopped") {
        setOutputText(prev => [...prev, "✅ Simulation terminated. Ready to run again", "\n"]);
        setIsSimulationRunning(false);
      }
    } catch (error) {
      console.error(error);
      setOutputText(prev => [...prev, "Stop failed: " + error.message]);
      setIsSimulationRunning(false);
    }
  };

  const shareSimulationResult = (resultImage, simulationInputs) => {
    if (!resultImage) {
      alert('No simulation result available.');
      return;
    }

    try {
      // Combine the image and input parameters into a single object
      const payload = {
        image: resultImage,       // base64 string or URL of the simulation result
        inputs: simulationInputs, // JSON object containing simulation parameters
        timestamp: new Date().toISOString() // current timestamp
      };

      // Create a Blob from the payload and generate a temporary URL
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      // Copy the URL to the clipboard
      navigator.clipboard.writeText(url);
      alert(`Sharable link is copied to the clipboard!\n${url}`);

      // Revoke the URL after a certain time to free memory
      setTimeout(() => URL.revokeObjectURL(url), 60000); // revoke after 1 minute
    } catch (err) {
      console.error(err);
      alert('Failed to create share link');
    }
  };


  // Sidebar buttons

  const handleLogoClick = () => {
    if (!sidebarExpanded) setSidebarExpanded(true);
    else navigate('/');
  };


  // UI Style

  const sidebarStyle = {
    height: '100vh',
    width: `${sidebarWidth}px`,
    backgroundColor: '#f7f7f7', // backgroundColor: 'rgb(170, 171, 184)',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 3px 0px 3px',
    transition: 'width 0.3s',
    borderRight: '1px solid #ccc',
  };

  const sidebarHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '0px 10px 0px 10px',
    justifyContent: 'space-between',
  };

  const logoContainerStyle = {
    width: `${logoSize}px`,
    height: `${logoSize}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const logoStyle = {
    width: `${logoSize}px`,
    height: `${logoSize}px`,
    objectFit: 'contain',
    borderRadius: '8px'
  };

  const toggleStyle = {
    width: `${toggleSize}px`,
    height: `${toggleSize}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const sidebarItemStyle = (active) => ({
    padding: '10px',
    marginBottom: '5px',
    cursor: 'pointer',
    borderRadius: '10px',
    backgroundColor: active ? '#e6e6e6' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: sidebarExpanded ? 'flex-start' : 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '16px',
  });

  const iconStyle = {
    width: '24px',
    height: '24px',
    marginRight: sidebarExpanded ? '10px' : '0',
  };

  const mainContentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const topSectionStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '10px 20px',
    borderBottom: '1px solid #ccc',
    // backgroundColor: 'rgb(120, 130, 145)',
  };

  const buttonGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    flex: '0 0 150px',
    height: '100%',
    justifyContent: 'flex-end',
  };

  const buttonRowStyle = {
    display: 'flex',
    gap: '8px',
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    width: '100%',
    minWidth: '200px',
    maxWidth: '200px',
    padding: '0 5px',
    boxSizing: 'border-box',
  };

  const dividerStyle = {
    width: '1px',
    backgroundColor: '#ccc',
    alignSelf: 'stretch',
    margin: '0 5px',
  };

  const iconButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    minWidth: '30px',
    minHeight: '30px',
    padding: '0px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: '#fff',
    cursor: 'pointer',
    boxSizing: 'border-box',
    flexShrink: 0,
  };

  const bottomSectionStyle = {
    flex: 1,
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
  };

  const imageAreaStyle = {
    flex: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid #ccc',
    backgroundColor: '#fff',
    overflow: "hidden",
    height: '100%',
  };

  const textAreaStyle = {
    flex: 2,
    padding: '20px',
    backgroundColor: '#f9f9f9',
    overflowX: "hidden",
    overflowY: "auto",
    maxHeight: "100%",
  };

  const selectStyle = {
    width: '100%',
    height: '28px',
    boxSizing: 'border-box',
    padding: '10 0px',
    minWidth: '80px',
    fontSize: '14px',
    borderRadius: '3px',
  };

  const fileInputRowStyle = {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  };

  const fileInputStyle = {
    flex: 1,
    height: '28px',
    boxSizing: 'border-box',
    padding: '0 8px',
    minWidth: '50px',
    fontSize: '12px',
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden'}}>
      {/* Joyride */}
      {/* <Joyride
        steps={tutorialSteps}
        run={runTour}
        continuous
        scrollToFirstStep
        disableOverlay={true} // 배경 깜빡임 제거
        spotlightPadding={0}  // spotlight 영역 여백 제거
        styles={{ options: { primaryColor: '#1976d2', zIndex: 10000, spotlightShadow: "0 0 0 transparent"},
          tooltip: {
            fontSize: '16px',   // 글자 크기 줄이기
            padding: '8px 12px', // 안쪽 여백 줄이기
            maxWidth: '500px',   // 박스 최대 너비
            textAlign: 'left',
          },      
        }}
        locale={{
          back: "Back",
          last: "Finish",
          next: "Next",
          skip: "Skip"
        }}
        callback={(data) => {
          if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
            setRunTour(false);
          }
        }}
      /> */}
      <Joyride
        steps={tutorialSteps}
        run={runTour}
        continuous={true}
        showSkipButton={false}
        showCloseButton={false}      // X 버튼 제거
        disableOverlay={true}        // overlay 제거
        spotlightClicks={false}
        spotlightPadding={0}
        floaterProps={{ 
          disableAnimation: true,    // 툴팁 애니메이션 제거
          hideArrow: false            // 화살표는 필요시
        }}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#1976d2',
            spotlightShadow: '0 0 0 transparent',
            showProgress: false,
          },
          tooltip: {
            fontSize: '16px',
            padding: '8px 12px',
            maxWidth: '600px',
            borderRadius: '6px',
            textAlign: 'left',
          },
          overlay: { display: 'none' },
        }}
        locale={{
          back: "Back",
          next: "Next",
          last: "Finish",
          skip: "Skip",
          close: "",  // X 버튼 제거
        }}
        callback={(data) => {
          if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
            setRunTour(false);
            setTimeout(() => setTutorialSteps([]), 200);
          }
        }}
      />

      <div style={sidebarStyle}>
        <div style={sidebarHeaderStyle}>
          <div
            style={logoContainerStyle}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            onClick={handleLogoClick}
          >
            {!sidebarExpanded && logoHovered ? (
              <img src={sidebarIcon} alt="Expand" style={{ width: `${toggleSize}px`, height: `${toggleSize}px` }} />
            ) : (
              <img src={logo} alt="Logo" style={logoStyle} />
            )}
          </div>

          {sidebarExpanded && (
            <div style={toggleStyle} onClick={handleToggle}>
              <img src={sidebarIcon} alt="Collapse" style={{ width: `${toggleSize}px`, height: `${toggleSize}px` }} />
            </div>
          )}
        </div>

        {menuItems.map((item, index) => (
          <div
            key={item.name}
            ref={(el) => (menuRefs.current[index] = el)}
            style={{
              ...sidebarItemStyle(activeMenu === item.name),
              // cursor: ['Optics Design', 'Sensor Design'].includes(item.name) ? 'not-allowed' : 'pointer',
              // opacity: ['Optics Design', 'Sensor Design'].includes(item.name) ? 0.5 : 1
            }}
            onClick={() => {
              // if (!['Optics Design', 'Sensor Design'].includes(item.name)) {
              if (item.name !== 'Sensor Design'){
                setActiveMenu(item.name);
              }
            }}
          >
            <img src={item.icon} alt={item.name} style={iconStyle} />
            {sidebarExpanded && <span>{item.name}</span>}
          </div>
        ))}

        {/* 🔹 사용자 영역 + Tutorial 버튼 묶기 */}
        <div style={{ marginTop: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Tutorial 버튼 */}
          <button
            onClick={() => setShowStageMenu(prev => !prev)}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: '#008B8B',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Tutorial
          </button>

          {/* 중앙 모달 팝업 */}
          {showStageMenu && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.4)', // 반투명 배경
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000,
              }}
              onClick={() => setShowStageMenu(false)} // 배경 클릭 시 닫기
            >
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '20px 24px',
                  borderRadius: '8px',
                  minWidth: '300px',
                  maxWidth: '400px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭은 닫기 방지
              >
                {stages.map(stage => (
                  <button
                    key={stage}
                    onClick={() => startTutorial(stage)}
                    style={{
                      display: 'block',
                      margin: '6px 0',
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontSize: '14px',
                      textAlign: 'center',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 사용자 이니셜 */}
          <div
            ref={userRef}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              borderTop: sidebarExpanded ? '1px solid #ccc' : 'transparent',
              backgroundColor: sidebarExpanded ? '#fafafa' : 'transparent',
              height: '60px',
              boxSizing: 'border-box',
              pointerEvents: 'none',
              paddingTop: '8px'
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#009ACD',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: '600',
                marginRight: '15px',
                flexShrink: 0,
              }}
            >
              {currentUser.charAt(0).toUpperCase()}
            </div>

            {sidebarExpanded && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '600', fontSize: '16px', color: '#111' }}>
                  {currentUser}
                </span>
                <span style={{ fontSize: '14px', color: '#666'}}>
                  {currentPlan}
                </span>
              </div>
            )}
          </div>
        </div>

        {showPlanModal && (
          <PlanModal
            anchorRef={userRef}
            currentPlan={currentPlan}
            onClose={() => setShowPlanModal(false)}
            onChangePlan={(newPlan) => {
              setCurrentPlan(newPlan);
              setShowPlanModal(false);
            }}
          />
        )}
      </div>

      <div style={{width: `calc(100% - ${sidebarWidth}px)` }}>
        {activeMenu === 'System Optimization' && (
          <div style={mainContentStyle}>
            <div style={topSectionStyle}>
              <div style={buttonGroupStyle}>
                <div style={buttonRowStyle}>
                  <button title="New" 
                    style={{...iconButtonStyle,
                            opacity: isSimulationRunning ? 0.5 : 1,
                            cursor: isSimulationRunning ? "not-allowed" : "pointer"}}
                    disabled={isSimulationRunning}
                  >
                    <img src={newpage} alt="New" style={{ width: 20, height: 20 }} onClick={handleNewPage}/>
                  </button>
                  <button title="Save" style={{...iconButtonStyle, opacity: 0.5, cursor: 'not-allowed'}}>
                    <img src={save} alt="Save" style={{ width: 20, height: 20 }} />
                  </button>
                  <button title="Back" style={{...iconButtonStyle, opacity: 0.5, cursor: 'not-allowed'}}>
                    <img src={back} alt="Back" style={{ width: 20, height: 20 }} />
                  </button>
                  <button title="Forward" style={{...iconButtonStyle, opacity: 0.5, cursor: 'not-allowed'}}>
                    <img src={forward} alt="Forward" style={{ width: 20, height: 20 }} />
                  </button>
                </div>

                <div style={buttonRowStyle}>
                  <button title="Run"
                    id="run-button" 
                    style={{...iconButtonStyle, 
                            opacity: isSimulationRunning ? 0.5 : 1,
                            cursor: isSimulationRunning ? "not-allowed" : "pointer"}}
                    onClick={handleRunSimulation} 
                    disabled={isSimulationRunning}>
                    <img src={run} alt="Run" style={{ width: 20, height: 20 }} />
                  </button>
                  <button title="Stop" style={{...iconButtonStyle, opacity: 0.5, cursor: 'not-allowed'}} disabled onClick={handleStopSimulation}>
                    <img src={stop} alt="Stop" style={{ width: 20, height: 20 }} />
                  </button>
                  <button title="SFR" style={{...iconButtonStyle, opacity: 0.5, cursor: 'not-allowed'}}>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>SFR</span>
                  </button>
                  <button
                    style={{...iconButtonStyle,  opacity: 0.5, cursor: 'not-allowed'}}
                    title="Share"
                    disabled
                    onClick={()=>shareSimulationResult(resultImage, {
                      illuminant: selectedIlluminant,
                      illuminantLuminance: illuminantLuminanceValue,
                      illuminantCustomPhotons: customIlluminantData.map(row => Number(row[0])),
                      scene: selectedScene,
                      sceneFile: sceneFile,
                      sceneLuminance: sceneLuminanceValue,
                      macbethParams: macbethParams,
                      pointarrayParams: pointarrayParams,
                      gridlinesParams: gridlinesParams,
                      slantededgeParams: slantededgeParams,
                      ringsraysParams: ringsraysParams,
                      sceneFileParams: sceneFileParams,
                      optics: selectedOptics,
                      sensor: selectedSensor,
                      sensorParams: sensorValues,
                      isp: selectedISP,
                      ispParams: ispValues,
                      algorithm: selectedAlgorithm
                    })}
                  >
                    <img src={upload} alt="Share" style={{ width: 20, height: 20 }} />
                  </button>
                </div>
              </div>

              <div style={dividerStyle}></div>

              {/* Illuminant */}
              <div style={sectionStyle}>
                <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold'}}>Illuminant</label>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <select
                    style={selectStyle} 
                    value={selectedIlluminant} 
                    onChange={(e)=> setSelectedIlluminant(e.target.value)}
                    id="illuminant-select"
                  >
                    {illuminants.map((ill, idx) => <option key={idx}>{ill}</option>)}
                  </select>
                  
                  <button style={iconButtonStyle} onClick={() => setIsIlluminantLuminanceDialogOpen(true)} id="illuminant-param-select">
                    <img src={parameter} alt="Params" style={{ width: '20px', height: '20px' }} />
                  </button>

                  {isIlluminantLuminanceDialogOpen && (
                    selectedIlluminant === 'Custom' ? (
                      <IlluminantDialogCustom
                      initialData={customIlluminantData}
                      onSubmit={(values)=>{
                        IlluminantCustomSubmit(values);
                        setSceneLuminanceValue(''); 
                      }}
                      onClose={() => {
                        setIsIlluminantLuminanceDialogOpen(false)
                      }}
                    />
                    )
                    : (
                      <IlluminantLuminanceDialog
                      initialValue={illuminantLuminanceValue}
                      onSubmit={(values)=>{
                        IlluminantLuminanceSubmit(values);
                        setSceneLuminanceValue('');
                      }}
                      onClose={()=> {
                        setIsIlluminantLuminanceDialogOpen(false)
                      }}
                    />
                    )
                  )}

                  <button style={iconButtonStyle} onClick={() => openSpectrumPopup(selectedIlluminant, illuminantLuminanceValue, customIlluminantData)} id="illuminant-spectrum-select">
                    <img src={spectrum} alt="Spectrum" style={{ width: '20px', height: '20px' }} />
                  </button>
                </div>
              </div>

              <div style={dividerStyle}></div>

              {/* Scene */}
              <div style={sectionStyle}>
                <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold' }}>Scene</label>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <select 
                    id="scene-select"
                    style={selectStyle}
                    value={selectedScene}
                    onChange = {(e) => setSelectedScene(e.target.value)}
                  >
                    {scenes.map((s, idx) => <option key={idx} value = {s}>{s}</option>)}
                  </select>
                  
                  <button id="scene-param-select" style={iconButtonStyle} onClick = {sceneButtonClick}>
                    <img src={parameter} alt="Params" style={{ width: '20px', height: '20px' }} />
                  </button>
                  {isMacbethDialogOpen && <MacbethDialog initialValues={macbethParams} onSubmit={handleMacbethSubmit} onClose={() => {setIsMacbethDialogOpen(false);}} />}
                  {isPointArrayDialogOpen && <PointArrayDialog initialValues={pointarrayParams} onSubmit={handlePointArraySubmit} onClose={() => {setIsPointArrayDialogOpen(false);}} />}
                  {isGridlineDialogOpen && <GridlinesDialog initialValues={gridlinesParams} onSubmit={handleGridlinesSubmit} onClose={() => {setIsGridlineDialogOpen(false);}} />}
                  {isSlantedEdgeDialogOpen && <SlantedEdgeDialog initialValues={slantededgeParams} onSubmit={handleSlantededgeSubmit} onClose={() => {setIsSlantedEdgeDialogOpen(false);}} />}
                  {isRingsRaysDialogOpen && <RingsRaysDialog initialValues={ringsraysParams} onSubmit={handleRingsraysSubmit} onClose={() => {setIsRingsRaysDialogOpen(false);}} />}
                  {isSceneFileDialogOpen && 
                    <SceneFileDialog 
                      initialValues={sceneFileParams} 
                      illuminantData = {sceneFileIlluminantData}
                      onIlluminantChange = {sceneIlluminantSubmit} 
                      onSubmit={handleSceneFileSubmit} 
                      onClose={() => {setIsSceneFileDialogOpen(false);}} 
                    />
                  }

                  <button id="scene-luminance-select" style={iconButtonStyle} onClick={() => setIsSceneLuminanceDialogOpen(true)}>
                    <img src={brightness} alt="Brightness" style={{ width: '20px', height: '20px' }} />
                  </button>
                  {isSceneLuminanceDialogOpen && (
                    <SceneLuminanceDialog
                      initialValues = {sceneLuminanceValue}
                      onSubmit = {(values)=>{
                        SceneLuminanceSubmit(values);
                        setIlluminantLuminanceValue('');
                      }}
                      onClose={() => {
                        setIsSceneLuminanceDialogOpen(false)
                      }}
                    />
                  )}

                </div>

                <div style={fileInputRowStyle}>
                  <input
                    type="text"
                    value={sceneFile}
                    readOnly
                    placeholder=""
                    disabled
                    style={fileInputStyle}
                  />
                  <button
                    style={{...iconButtonStyle, opacity: 0.5, cursor: 'not-allowed'}}
                    title="Upload"
                    disabled
                    onClick={() => fileInputRef.current.click()}
                  >
                    <img src={upload} alt="Upload" style={{ width: 20, height: 20 }} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => e.target.files.length > 0 && setSceneFile(e.target.files[0].name)}
                  />
                </div>
              </div>

              <div style={dividerStyle}></div>

              {/* Optics */}
              <div style={sectionStyle}>
                <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold' }}>Optics</label>
                <select id="optics-select" style={selectStyle} value={selectedOptics} onChange={(e) => setSelectedOptics(e.target.value)}>{optics.map((o, idx) => <option key={idx}>{o}</option>)}</select>
                <div style={fileInputRowStyle}>
                  <input
                    type="text"
                    disabled
                    value={opticsFile}
                    readOnly
                    placeholder=""
                    style={fileInputStyle}
                  />
                  <button style={{...iconButtonStyle, opacity: 0.5, cursor: 'not-allowed'}} title="Upload">
                    <img src={upload} alt="Upload" style={{ width: 20, height: 20 }}/>
                    <input
                      type="file"
                      disabled
                      style={{ display: 'none' }}
                      onChange={(e) =>
                        e.target.files.length > 0 && setOpticsFile(e.target.files[0].name)
                      }
                    />
                  </button>
                </div>
              </div>

              <div style={dividerStyle}></div>

              {/* Sensor */}
              <div style={sectionStyle}>
                <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold' }}>Sensor</label>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <select id="sensor-select" style={selectStyle} value={selectedSensor} onChange={(e) => setSelectedSensor(e.target.value)}>{sensors.map((s, idx) => <option key={idx}>{s}</option>)}</select>

                  <button id="sensor-param-select" style={iconButtonStyle} onClick={() => setIsSensorDialogOpen(true)}>
                    <img src={parameter} alt="Params" style={{ width: '20px', height: '20px'}} />
                  </button>

                  {isSensorDialogOpen && (
                    <SensorDialog
                      initialValues={sensorValues}
                      onSubmit={handleSensorSubmit}
                      onClose={() => setIsSensorDialogOpen(false)}
                    />
                  )}

                </div>
              </div>

              <div style={dividerStyle}></div>

              {/* ISP */}
              <div style={sectionStyle}>
                <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold' }}>ISP</label>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <select id="isp-select" style={selectStyle} value={selectedISP} onChange={(e) => setSelectedISP(e.target.value)}>{isps.map((i, idx) => <option key={idx}>{i}</option>)}</select>
                  
                  <button id="isp-param-select" style={iconButtonStyle} onClick={() => {if(selectedISP === 'Fast-openISP'){setIsIspDialogOpen(true);}}}>
                    <img src={parameter} alt="Params" style={{ width: '20px', height: '20px' }} />
                  </button>

                  {isIspDialogOpen && (
                    <ISPDialog
                      initialValues = {ispValues}
                      onSubmit={handleISPSubmit}
                      onClose={() => setIsIspDialogOpen(false)}
                    />
                  )}
                </div>
                <div style={fileInputRowStyle}>
                  <input
                    type="text"
                    disabled
                    value={algorithmFile}
                    readOnly
                    placeholder=""
                    style={fileInputStyle}
                  />
                  <button style={{...iconButtonStyle, opacity: 0.5, cursor: 'not-allowed'}}>
                    <img src={upload} alt="Upload" style={{ width: 20, height: 20 }} />
                    <input
                      type="file"
                      disabled
                      style={{ display: 'none' }}
                      onChange={(e) => e.target.files.length > 0 && setAlgorithmFile(e.target.files[0].name)}
                    />
                  </button>
                </div>
              </div>

              <div style={dividerStyle}></div>

              {/* Algorithms */}
              <div style={sectionStyle}>
                <label style={{ textAlign: 'center', width: '100%', fontSize: '14px', fontWeight: 'bold' }}>Algorithms</label>
                <select id="algorithm-select" style={selectStyle} value={selectedAlgorithm} onChange={(e) => setSelectedAlgorithm(e.target.value)}>{algorithms.map((a, idx) => <option key={idx}>{a}</option>)}</select>
                <div style={fileInputRowStyle}>
                  <input
                    type="text"
                    disabled
                    value={algorithmFile}
                    readOnly
                    placeholder=""
                    style={fileInputStyle}
                  />
                  <button style={{...iconButtonStyle, opacity: 0.5, cursor: 'not-allowed'}}>
                    <img src={upload} alt="Upload" style={{ width: 20, height: 20 }} />
                    <input
                      type="file"
                      disabled
                      style={{ display: 'none' }}
                      onChange={(e) => e.target.files.length > 0 && setAlgorithmFile(e.target.files[0].name)}
                    />
                  </button>
                </div>
              </div>

              <div style={dividerStyle}></div>

            </div>

            <div style={bottomSectionStyle}>
              <div style={imageAreaStyle}>
                {resultImage ? (
                  <img src={resultImage} alt="Simulation Result" style={{width: "100%", height: "100%", objectFit: "contain", imageRendering: 'pixelated'}}/>
                ):(
                  <span></span>
                )}
                
              </div>
              <div ref={outputTextRef} style={textAreaStyle}>
                {Array.isArray(outputText) 
                  ? outputText.map((line, idx) => (
                      <pre key={idx} style={{margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word"}}>{line}</pre>
                    ))
                  : <pre style={{margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word"}}>{outputText}</pre>
                }
              </div>
            </div>
          </div>
        )}


        {activeMenu === 'Optics Design' && (
          <OpticsDesign/>
        )}
      </div>




    </div>
  );
};

export default Simulate;
