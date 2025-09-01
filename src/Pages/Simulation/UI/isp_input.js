import React, { useState, useEffect } from 'react';

const ISPDialog = ({onSubmit, onClose, initialValues }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (onClose) onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

 // DPC
  const [dpcEnabled, setDpcEnabled] = useState(initialValues.dpcEnabled ?? true);
  const [dpcValue, setDpcValue] = useState(initialValues.dpcValue ?? '30');

  // BLC
  const [blcEnabled, setBlcEnabled] = useState(initialValues.blcEnabled ?? true);
  const [blcR, setBlcR] = useState(initialValues.blcR ?? '0');
  const [blcGr, setBlcGr] = useState(initialValues.blcGr ?? '0');
  const [blcGb, setBlcGb] = useState(initialValues.blcGb ?? '0');
  const [blcB, setBlcB] = useState(initialValues.blcB ?? '0');
  const [blcalpha, setBlcalpha] = useState(initialValues.blcalpha ?? '0');
  const [blcbeta, setBlcbeta] = useState(initialValues.blcbeta ?? '0');

  // AAF
  const [aafEnabled, setAafEnabled] = useState(initialValues.aafEnabled ?? true);

  // AWB
  const [awbEnabled, setAwbEnabled] = useState(initialValues.awbEnabled ?? true);
  const [awbR, setAwbR] = useState(initialValues.awbR ?? '1400');
  const [awbGr, setAwbGr] = useState(initialValues.awbGr ?? '1200');
  const [awbGb, setAwbGb] = useState(initialValues.awbGb ?? '1200');
  const [awbB, setAwbB] = useState(initialValues.awbB ?? '5000');

  // CNF
  const [cnfEnabled, setCnfEnabled] = useState(initialValues.cnfEnabled ?? true);
  const [cnfValue, setCnfValue] = useState(initialValues.cnfValue ?? '0');

  // CFA
  const [cfaEnabled, setCfaEnabled] = useState(initialValues.cfaEnabled ?? true);
  const [cfaType, setCfaType] = useState(initialValues.cfaType ?? 'malvar');

  // CCM
  const [ccmEnabled, setCcmEnabled] = useState(initialValues.ccmEnabled ?? true);
  const [ccmValues, setCcmValues] = useState(initialValues.ccmValues ?? [
    ['0', '0', '2000', '0'],
    ['0', '2000', '0', '0'],
    ['2000', '0', '0', '0'],
  ]);

  // GAC
  const [gacEnabled, setGacEnabled] = useState(initialValues.gacEnabled ?? true);
  const [gacGain, setGacGain] = useState(initialValues.gacGain ?? '256');
  const [gacOffset, setGacOffset] = useState(initialValues.gacOffset ?? '0.8');

  // CSC
  const [cscEnabled, setCscEnabled] = useState(initialValues.cscEnabled ?? true);

  // NLM
  const [nlmEnabled, setNlmEnabled] = useState(initialValues.nlmEnabled ?? true);
  const [nlmRadius, setNlmRadius] = useState(initialValues.nlmRadius ?? '9');
  const [nlmSigma, setNlmSigma] = useState(initialValues.nlmSigma ?? '3');
  const [nlmHeight, setNlmHeight] = useState(initialValues.nlmHeight ?? '10');

  // BNF
  const [bnfEnabled, setBnfEnabled] = useState(initialValues.bnfEnabled ?? true);
  const [bnfDistTh, setBnfDistTh] = useState(initialValues.bnfDistTh ?? '1.0');
  const [bnfNormGain, setBnfNormGain] = useState(initialValues.bnfNormGain ?? '1.0');

  // CEH
  const [cehEnabled, setCehEnabled] = useState(initialValues.cehEnabled ?? true);
  const [cehGain, setCehGain] = useState(initialValues.cehGain ?? '4,6');
  const [cehOffset, setCehOffset] = useState(initialValues.cehOffset ?? '0.01');

  // EEH
  const [eehEnabled, setEehEnabled] = useState(initialValues.eehEnabled ?? true);
  const [eehGain, setEehGain] = useState(initialValues.eehGain ?? '384');
  const [eehOffset, setEehOffset] = useState(initialValues.eehOffset ?? '100');
  const [eehEdgeThreshold, setEehEdgeThreshold] = useState(initialValues.eehEdgeThreshold ?? '4');
  const [eehDeltaThreshold, setEehDeltaThreshold] = useState(initialValues.eehDeltaThreshold ?? '1000');

  // FCS
  const [fcsEnabled, setFcsEnabled] = useState(initialValues.fcsEnabled ?? true);
  const [fcsGain, setFcsGain] = useState(initialValues.fcsGain ?? '8');
  const [fcsOffset, setFcsOffset] = useState(initialValues.fcsOffset ?? '32');

  // HSC
  const [hscEnabled, setHscEnabled] = useState(initialValues.hscEnabled ?? true);
  const [hscSaturationGain, setHscSaturationGain] = useState(initialValues.hscSaturationGain ?? '0');
  const [hscHueOffset, setHscHueOffset] = useState(initialValues.hscHueOffset ?? '256');

  // BCC
  const [bccEnabled, setBccEnabled] = useState(initialValues.bccEnabled ?? true);
  const [bccContrastGain, setBccContrastGain] = useState(initialValues.bccContrastGain ?? '0');
  const [bccBrightnessOffset, setBccBrightnessOffset] = useState(initialValues.bccBrightnessOffset ?? '256');

  // SCL
  const [sclEnabled, setSclEnabled] = useState(initialValues.sclEnabled ?? false);
  const [sclWidth, setSclWidth] = useState(initialValues.sclWidth ?? '1920');
  const [sclHeight, setSclHeight] = useState(initialValues.sclHeight ?? '1080');

  // CCM 행렬 값 변경 핸들러
  const handleCcmChange = (rowIndex, colIndex, value) => {
    const newCcmValues = [...ccmValues];
    newCcmValues[rowIndex][colIndex] = value;
    setCcmValues(newCcmValues);
  };

  useEffect(() => {
    if (!initialValues) return;

    setDpcEnabled(initialValues.dpcEnabled ?? dpcEnabled);
    setDpcValue(initialValues.dpcValue ?? dpcValue);

    setBlcEnabled(initialValues.blcEnabled ?? blcEnabled);
    setBlcR(initialValues.blcR ?? blcR);
    setBlcGr(initialValues.blcGr ?? blcGr);
    setBlcGb(initialValues.blcGb ?? blcGb);
    setBlcB(initialValues.blcB ?? blcB);
    setBlcalpha(initialValues.blcalpha ?? blcalpha);
    setBlcbeta(initialValues.blcbeta ?? blcbeta);

    setAafEnabled(initialValues.aafEnabled ?? aafEnabled);

    setAwbEnabled(initialValues.awbEnabled ?? awbEnabled);
    setAwbR(initialValues.awbR ?? awbR);
    setAwbGr(initialValues.awbGr ?? awbGr);
    setAwbGb(initialValues.awbGb ?? awbGb);
    setAwbB(initialValues.awbB ?? awbB);

    setCnfEnabled(initialValues.cnfEnabled ?? cnfEnabled);
    setCnfValue(initialValues.cnfValue ?? cnfValue);

    setCfaEnabled(initialValues.cfaEnabled ?? cfaEnabled);
    setCfaType(initialValues.cfaType ?? cfaType);

    setCcmEnabled(initialValues.ccmEnabled ?? ccmEnabled);
    setCcmValues(initialValues.ccmValues ?? ccmValues);

    setGacEnabled(initialValues.gacEnabled ?? gacEnabled);
    setGacGain(initialValues.gacGain ?? gacGain);
    setGacOffset(initialValues.gacOffset ?? gacOffset);

    setCscEnabled(initialValues.cscEnabled ?? cscEnabled);

    setNlmEnabled(initialValues.nlmEnabled ?? nlmEnabled);
    setNlmRadius(initialValues.nlmRadius ?? nlmRadius);
    setNlmSigma(initialValues.nlmSigma ?? nlmSigma);
    setNlmHeight(initialValues.nlmHeight ?? nlmHeight);

    setBnfEnabled(initialValues.bnfEnabled ?? bnfEnabled);
    setBnfDistTh(initialValues.bnfDistTh ?? bnfDistTh);
    setBnfNormGain(initialValues.bnfNormGain ?? bnfNormGain);

    setCehEnabled(initialValues.cehEnabled ?? cehEnabled);
    setCehGain(initialValues.cehGain ?? cehGain);
    setCehOffset(initialValues.cehOffset ?? cehOffset);

    setEehEnabled(initialValues.eehEnabled ?? eehEnabled);
    setEehGain(initialValues.eehGain ?? eehGain);
    setEehOffset(initialValues.eehOffset ?? eehOffset);
    setEehEdgeThreshold(initialValues.eehEdgeThreshold ?? eehEdgeThreshold);
    setEehDeltaThreshold(initialValues.eehDeltaThreshold ?? eehDeltaThreshold);

    setFcsEnabled(initialValues.fcsEnabled ?? fcsEnabled);
    setFcsGain(initialValues.fcsGain ?? fcsGain);
    setFcsOffset(initialValues.fcsOffset ?? fcsOffset);

    setHscEnabled(initialValues.hscEnabled ?? hscEnabled);
    setHscSaturationGain(initialValues.hscSaturationGain ?? hscSaturationGain);
    setHscHueOffset(initialValues.hscHueOffset ?? hscHueOffset);

    setBccEnabled(initialValues.bccEnabled ?? bccEnabled);
    setBccContrastGain(initialValues.bccContrastGain ?? bccContrastGain);
    setBccBrightnessOffset(initialValues.bccBrightnessOffset ?? bccBrightnessOffset);

    setSclEnabled(initialValues.sclEnabled ?? sclEnabled);
    setSclWidth(initialValues.sclWidth ?? sclWidth);
    setSclHeight(initialValues.sclHeight ?? sclHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);


  const handleSubmit = () => {
    const inputs = {
      dpcEnabled, dpcValue,
      blcEnabled, blcR, blcGr, blcGb, blcB, blcalpha, blcbeta,
      aafEnabled,
      awbEnabled, awbR, awbGr, awbGb, awbB,
      cnfEnabled, cnfValue,
      cfaEnabled, cfaType,
      ccmEnabled, ccmValues,
      gacEnabled, gacGain, gacOffset,
      cscEnabled,
      nlmEnabled, nlmRadius, nlmSigma, nlmHeight,
      bnfEnabled, bnfDistTh, bnfNormGain,
      cehEnabled, cehGain, cehOffset,
      eehEnabled, eehGain, eehOffset, eehEdgeThreshold, eehDeltaThreshold,
      fcsEnabled, fcsGain, fcsOffset,
      hscEnabled, hscSaturationGain, hscHueOffset,
      bccEnabled, bccContrastGain, bccBrightnessOffset,
      sclEnabled, sclWidth, sclHeight,
    };
    if (onSubmit) onSubmit(inputs);
    if (onClose) onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  
  return (
    <div style={styles.overlay}>
      <div style={styles.dialog} onKeyDown={handleKeyDown}>
        <h2 style={styles.title}>ISP Parameters</h2>
        <div style={styles.scrollArea}>
          <div style={styles.frame}>
            {/* DPC Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>DPC</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={dpcEnabled} onChange={(e) => setDpcEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.horizontalInnerLayout, flexGrow: 1 }}>
                      <label>difference threshold</label>
                      <input type="text" value={dpcValue} onChange={(e) => setDpcValue(e.target.value)} style={styles.textInput} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* BLC Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>BLC</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={blcEnabled} onChange={(e) => setBlcEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.gridLayout, flexGrow: 1 }}>
                      <div style={styles.gridItem}>
                        <label>bl_r</label>
                        <input type="text" value={blcR} onChange={(e) => setBlcR(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>bl_gr</label>
                        <input type="text" value={blcGr} onChange={(e) => setBlcGr(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>bl_gb</label>
                        <input type="text" value={blcGb} onChange={(e) => setBlcGb(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>bl_b</label>
                        <input type="text" value={blcB} onChange={(e) => setBlcB(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>alpha</label>
                        <input type="text" value={blcalpha} onChange={(e) => setBlcalpha(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>beta</label>
                        <input type="text" value={blcbeta} onChange={(e) => setBlcbeta(e.target.value)} style={styles.textInput} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* AAF Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>AAF</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={aafEnabled} onChange={(e) => setAafEnabled(e.target.checked)} style={{marginRight: 10}}/>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* AWB Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>AWB</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={awbEnabled} onChange={(e) => setAwbEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.gridLayout, flexGrow: 1 }}>
                      <div style={styles.gridItem}>
                        <label>r_gain</label>
                        <input type="text" value={awbR} onChange={(e) => setAwbR(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>gr_gain</label>
                        <input type="text" value={awbGr} onChange={(e) => setAwbGr(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>gb_gain</label>
                        <input type="text" value={awbGb} onChange={(e) => setAwbGb(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>b_gain</label>
                        <input type="text" value={awbB} onChange={(e) => setAwbB(e.target.value)} style={styles.textInput} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* CNF Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>CNF</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={cnfEnabled} onChange={(e) => setCnfEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.horizontalInnerLayout, flexGrow: 1 }}>
                      <label>difference threshold</label>
                      <input type="text" value={cnfValue} onChange={(e) => setCnfValue(e.target.value)} style={styles.textInput} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* CFA Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>CFA</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={cfaEnabled} onChange={(e) => setCfaEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.horizontalInnerLayout, flexGrow: 1 }}>
                      <label>mode</label>
                      <select value={cfaType} onChange={(e) => setCfaType(e.target.value)} style={styles.selectBox}>
                        <option>bilinear</option>
                        <option>malvar</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* CCM Section */}
            <div style={{ ...styles.sectionFrame, minHeight: 160, maxHeight: 160 }}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>CCM</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={{ ...styles.horizontalInnerLayout}}>
                    <input type="checkbox" checked={ccmEnabled} onChange={(e) => setCcmEnabled(e.target.checked)} style={{marginRight: 10}} />
                    <table style={styles.tableWidget}>
                      <thead>
                        <tr>
                          <th style={styles.tableHeader}></th> {/* 빈칸, 행 header와 맞추기 */}
                          <th style={styles.tableHeader}>R</th>
                          <th style={styles.tableHeader}>G</th>
                          <th style={styles.tableHeader}>B</th>
                          <th style={styles.tableHeader}>Offset</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ccmValues.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {/* 행 헤더 추가 */}
                            <th style={styles.tableHeader}>
                              {['R','G','B'][rowIndex] || `Row ${rowIndex + 1}`} 
                              {/* 행 개수에 맞춰 라벨 지정, 필요시 수정 */}
                            </th>
                            {row.map((col, colIndex) => (
                              <td key={colIndex} style={styles.tableCell}>
                                <input
                                  type="text"
                                  value={ccmValues[rowIndex][colIndex]}
                                  onChange={(e) => handleCcmChange(rowIndex, colIndex, e.target.value)}
                                  style={styles.tableInput}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            
            <hr style={styles.horizontalLine} />

            {/* GAC Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>GAC</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={gacEnabled} onChange={(e) => setGacEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.gridLayout, flexGrow: 1 }}>
                      <div style={styles.gridItem}>
                        <label>gain</label>
                        <input type="text" value={gacGain} onChange={(e) => setGacGain(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>gamma</label>
                        <input type="text" value={gacOffset} onChange={(e) => setGacOffset(e.target.value)} style={styles.textInput} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* CSC Section */}
            <div style={styles.sectionFrame}> {/* minHeight removed for simpler content */}
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>CSC</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={cscEnabled} onChange={(e) => setCscEnabled(e.target.checked)} />
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* NLM Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>NLM</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={nlmEnabled} onChange={(e) => setNlmEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.gridLayout, flexGrow: 1 }}>
                      <div style={styles.gridItem}>
                        <label>search window size</label>
                        <input type="text" value={nlmRadius} onChange={(e) => setNlmRadius(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>patch size</label>
                        <input type="text" value={nlmSigma} onChange={(e) => setNlmSigma(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>height</label>
                        <input type="text" value={nlmHeight} onChange={(e) => setNlmHeight(e.target.value)} style={styles.textInput} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* BNF Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>BNF</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={bnfEnabled} onChange={(e) => setBnfEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.gridLayout, flexGrow: 1 }}>
                      <div style={styles.gridItem}>
                        <label>intensity sigma</label>
                        <input type="text" value={bnfDistTh} onChange={(e) => setBnfDistTh(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>spatial sigma</label>
                        <input type="text" value={bnfNormGain} onChange={(e) => setBnfNormGain(e.target.value)} style={styles.textInput} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* CEH Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>CEH</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={cehEnabled} onChange={(e) => setCehEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.gridLayout, flexGrow: 1 }}>
                      <div style={styles.gridItem}>
                        <label>tiles</label>
                        <input type="text" value={cehGain} onChange={(e) => setCehGain(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>clip limit</label>
                        <input type="text" value={cehOffset} onChange={(e) => setCehOffset(e.target.value)} style={styles.textInput} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* EEH Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>EEH</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={eehEnabled} onChange={(e) => setEehEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.gridLayout, flexGrow: 1 }}>
                      <div style={styles.gridItem}>
                        <label>edge gain</label>
                        <input type="text" value={eehGain} onChange={(e) => setEehGain(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>flat threshold</label>
                        <input type="text" value={eehOffset} onChange={(e) => setEehOffset(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>edge threshold</label>
                        <input type="text" value={eehEdgeThreshold} onChange={(e) => setEehEdgeThreshold(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>delta threshold</label>
                        <input type="text" value={eehDeltaThreshold} onChange={(e) => setEehDeltaThreshold(e.target.value)} style={styles.textInput} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* FCS Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>FCS</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={fcsEnabled} onChange={(e) => setFcsEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.gridLayout, flexGrow: 1 }}>
                      <div style={styles.gridItem}>
                        <label>delta min</label>
                        <input type="text" value={fcsGain} onChange={(e) => setFcsGain(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>delta max</label>
                        <input type="text" value={fcsOffset} onChange={(e) => setFcsOffset(e.target.value)} style={styles.textInput} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* HSC Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>HSC</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={hscEnabled} onChange={(e) => setHscEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.gridLayout, flexGrow: 1 }}>
                      <div style={styles.gridItem}>
                        <label>hue offset</label>
                        <input type="text" value={hscSaturationGain} onChange={(e) => setHscSaturationGain(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>saturation gain</label>
                        <input type="text" value={hscHueOffset} onChange={(e) => setHscHueOffset(e.target.value)} style={styles.textInput} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* BCC Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>BCC</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={bccEnabled} onChange={(e) => setBccEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.gridLayout, flexGrow: 1 }}>
                      <div style={styles.gridItem}>
                        <label>brightness offset</label>
                        <input type="text" value={bccContrastGain} onChange={(e) => setBccContrastGain(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>contrast gain</label>
                        <input type="text" value={bccBrightnessOffset} onChange={(e) => setBccBrightnessOffset(e.target.value)} style={styles.textInput} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr style={styles.horizontalLine} />

            {/* SCL Section */}
            <div style={styles.sectionFrame}>
              <div style={styles.horizontalLayout}>
                <div style={styles.labelFrame}>
                  <label style={styles.sectionLabel}>SCL</label>
                </div>
                <div style={styles.contentFrame}>
                  <div style={styles.horizontalInnerLayout}>
                    <input type="checkbox" checked={sclEnabled} onChange={(e) => setSclEnabled(e.target.checked)} style={{marginRight: 10}}/>
                    <div style={{ ...styles.gridLayout, flexGrow: 1 }}>
                      <div style={styles.gridItem}>
                        <label>width</label>
                        <input type="text" value={sclWidth} onChange={(e) => setSclWidth(e.target.value)} style={styles.textInput} />
                      </div>
                      <div style={styles.gridItem}>
                        <label>height</label>
                        <input type="text" value={sclHeight} onChange={(e) => setSclHeight(e.target.value)} style={styles.textInput} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

              <div style={styles.buttonContainer}>
                <button onClick={()=> {
                    if (onSubmit) handleSubmit();
                    if (onClose) onClose();
                  }} 
                  style={styles.button}
                >
                  Modify
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  dialog: {
    width: 850,
    height: 900,
    backgroundColor: 'rgb(255, 255, 255)', // Changed dialog background to match PySide2 screenshot
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: "30px 0 20px 0",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: 'center',
  },
  scrollArea: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    padding: '10px',
  },
  frame: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    padding: 9,
    minWidth: 800,
    maxWidth: 800,
    minHeight: 800, // Maintain minimum height for scrollability
  },
  sectionFrame: {
    border: '1px solid black',
    padding: 1,
    minHeight: 50, // Ensure consistent minimum height for sections
    display: 'flex', // Added for vertical centering of content within the section
    alignItems: 'center', // Added for vertical centering of content within the section
  },
  horizontalLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: '0 5px',
    width: '100%', // Ensure it takes full width of the sectionFrame
  },
  labelFrame: {
    minWidth: 180,
    maxWidth: 180,
    display: 'flex', // Make labelFrame a flex container
    alignItems: 'center', // Vertically center the label within labelFrame
    height: '100%', // Ensure labelFrame takes full height to allow vertical centering
  },
  contentFrame: {
    flexGrow: 3,
  },
  sectionLabel: {
    fontWeight: 'normal',
    fontSize: '16px',
  },
  horizontalInnerLayout: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    fontSize: '14px',
  },
  gridLayout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px 50px',
    alignItems: 'center',
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: '14px',
  },
  textInput: {
    backgroundColor: 'rgb(255, 255, 255)',
    textAlign: 'center',
    border: '1px solid #ccc',
    padding: '5px',
    borderRadius: '4px',
    fontSize: '14px',
    width: '100px',
  },
  selectBox: {
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid #ccc',
    padding: '5px',
    borderRadius: '4px',
    width: '130px',
    textAlign: 'center',
  },
  tableWidget: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderCollapse: 'collapse',
    width: '100%',
    minWidth: 417,
  },
  tableHeader: {
    border: '1px solid black',
    padding: 5,
    textAlign: 'center',
    fontSize: '14px',
  },
  tableCell: {
    border: '1px solid black',
    padding: 5,
    fontSize: '14px',
  },
  tableInput: {
    width: '100%',
    boxSizing: 'border-box',
    border: 'none',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#008B8B',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',  
  },
  horizontalLine: {
    border: 'none',
    borderTop: '1px solid black',
    margin: '1px 0',
  },
};

export default ISPDialog;
