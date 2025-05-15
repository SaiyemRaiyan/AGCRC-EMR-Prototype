    document.addEventListener('DOMContentLoaded', function() {
      // Set current date
      const today = new Date();
      const visitDateInput = document.getElementById('visit-date');
      if (visitDateInput) {
        const formattedDate = today.toISOString().split('T')[0];
        visitDateInput.value = formattedDate;
      }

      // Improved toggle display function for conditional sections
      function setupToggle(triggerSelector, targetId, checkValue = true) {
        const triggers = document.querySelectorAll(triggerSelector);
        const target = document.getElementById(targetId);

        if (!triggers.length || !target) return;

        function updateDisplay() {
          const shouldShow = Array.from(triggers).some(el => 
            el.checked && (checkValue === true || el.value == checkValue)
          );
          target.style.display = shouldShow ? 'block' : 'none';
        }

        triggers.forEach(trigger => {
          trigger.addEventListener('change', updateDisplay);
        });

        // Initialize on page load
        updateDisplay();
      }

      // Set up all conditional displays
      setupToggle('input[name="murmurs"]', 'murmur-details', 'present');
      setupToggle('input[name="murmurs-present"]', 'murmurs-present-details', 'present');
      setupToggle('input[name="heart-disease"]', 'heart-disease-details', 'yes');
      setupToggle('input[name="radiating-pain"]', 'radiating-pain-details', 'yes');
      setupToggle('input[name="cholesterol-test"]', 'cholesterol-details', 'yes');
      setupToggle('input[name="hba1c-test"]', 'hba1c-details', 'yes');
      setupToggle('input[name="cpk-test"]', 'cpk-details', 'yes');
      setupToggle('input[name="troponin-test"]', 'troponin-details', 'yes');
      setupToggle('input[name="xray-test"]', 'xray-details', 'yes');
      setupToggle('input[name="ekg-test"]', 'ekg-details', 'yes');
      setupToggle('input[name="echo-test"]', 'echo-details', 'yes');
      setupToggle('input[name="oximetry-test"]', 'oximetry-details', 'yes');
      setupToggle('input[name="retinal-imaging"]', 'retinal-details', 'yes');
      setupToggle('input[name="breast-skin"], input[name="breast-masses"]', 'breast-problem', 'yes');
      setupToggle('input[name="lungs-right-normal"]', 'lungs-right-abnormal', 'no');
      setupToggle('input[name="lungs-left-normal"]', 'lungs-left-abnormal', 'no');
      setupToggle('input[name="further-tests"]', 'further-tests-details', 'specific');
      setupToggle('input[name="teleconsult"]', 'teleconsult-details', 'yes');

      // BMI calculation
      const weightInput = document.getElementById('weight');
      const heightInput = document.getElementById('height');
      const bmiInput = document.getElementById('bmi');

      function calculateBMI() {
        if (weightInput && heightInput && bmiInput) {
          const weight = parseFloat(weightInput.value);
          const height = parseFloat(heightInput.value) / 100; // convert cm to m
          bmiInput.value = (weight && height > 0) ? (weight / (height * height)).toFixed(1) : "";
        }
      }

      if (weightInput && heightInput) {
        ['input', 'change'].forEach(event => {
          weightInput.addEventListener(event, calculateBMI);
          heightInput.addEventListener(event, calculateBMI);
        });
        calculateBMI();
      }

           // Waist/hip ratio calculation
    const waistInput = document.getElementById('waist-circumference');
    const hipInput = document.getElementById('hip-circumference');
    const ratioDisplay = document.getElementById('waist-hip-ratio');

    function calculateWaistHipRatio() {
        if (waistInput && hipInput && ratioDisplay) {
            const waist = parseFloat(waistInput.value);
            const hip = parseFloat(hipInput.value);

            if (waist > 0 && hip > 0) {
                const ratio = (waist / hip).toFixed(2);
                ratioDisplay.textContent = ratio;
            } else {
                ratioDisplay.textContent = "";
            }
        }
    }

    if (waistInput && hipInput) {
        ['input', 'change'].forEach(event => {
            waistInput.addEventListener(event, calculateWaistHipRatio);
            hipInput.addEventListener(event, calculateWaistHipRatio);
        });
        calculateWaistHipRatio();
    }

    // Blood pressure average calculation
    const bp1Systolic = document.getElementById('bp1-systolic');
    const bp1Diastolic = document.getElementById('bp1-diastolic');
    const bp2Systolic = document.getElementById('bp2-systolic');
    const bp2Diastolic = document.getElementById('bp2-diastolic');
    const bpAverage = document.getElementById('bp-average');
    
    function calculateBPAverage() {
        if (bp1Systolic && bp1Diastolic && bp2Systolic && bp2Diastolic && bpAverage) {
            const sys1 = parseFloat(bp1Systolic.value) || 0;
            const dia1 = parseFloat(bp1Diastolic.value) || 0;
            const sys2 = parseFloat(bp2Systolic.value) || 0;
            const dia2 = parseFloat(bp2Diastolic.value) || 0;
            
            if (sys1 > 0 && dia1 > 0 && sys2 > 0 && dia2 > 0) {
                const avgSys = Math.round((sys1 + sys2) / 2);
                const avgDia = Math.round((dia1 + dia2) / 2);
                bpAverage.value = `${avgSys}/${avgDia}`;
            } else {
                bpAverage.value = '';
            }
        }
    }
    
    if (bp1Systolic && bp1Diastolic && bp2Systolic && bp2Diastolic) {
        ['input', 'change'].forEach(event => {
            bp1Systolic.addEventListener(event, calculateBPAverage);
            bp1Diastolic.addEventListener(event, calculateBPAverage);
            bp2Systolic.addEventListener(event, calculateBPAverage);
            bp2Diastolic.addEventListener(event, calculateBPAverage);
        });
        calculateBPAverage();
    }

      // Button functionality
      const saveBtn = document.getElementById('save-btn');
      const submitBtn = document.getElementById('submit-btn');
      const printBtn = document.getElementById('print-btn');

      if (saveBtn) {
        saveBtn.addEventListener('click', function() {
          alert('Form data saved successfully!');
        });
      }

      if (submitBtn) {
        submitBtn.addEventListener('click', function() {
          if (confirm('Are you sure you want to submit this to EMR?')) {
            alert('Form submitted to EMR successfully!');
          }
        });
      }

      if (printBtn) {
        printBtn.addEventListener('click', function() {
          window.print();
        });
      }

      // Info modal functionality
      const modal = document.getElementById("infoModal");
      const infoLinks = document.querySelectorAll(".info-link");
      const infoContent = document.getElementById("infoContent");
      const span = document.querySelector(".close");

      // Info content definitions
      const infoData = {
        
      "jugler-pressure": `
    <h3 style="color: #1976d2; margin-top: 0; text-align: center; font-weight: bold; text-shadow: 1px 1px 3px rgba(25,118,210,0.2); animation: pulse 2s infinite;">
        Jugular Pressure
    </h3>
    <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
        <div style="background: linear-gradient(to right, #e3f2fd, #bbdefb); padding: 15px; border-left: 5px solid #2196f3; border-radius: 0 8px 8px 0; animation: fadeIn 1s;">
            <p style="margin-bottom: 0; color: #0d47a1; font-weight: 500;">
                To estimate jugular venous pressure, the patient should be positioned in a semi-recumbent position (at 45°) and asked to turn their head slightly to the left. The internal jugular vein, running between the medial end of the clavicle and the ear lobe, should be inspected for evidence. The jugular venous pressure is easiest to observe if one looks along the surface of the sternocleidomastoid muscle, as it is easier to appreciate the movement relative to the neck when looking from the side (as opposed to looking at the surface at a 90 degree angle). The filling level of the jugular vein should be less than 4 centimeters vertical height above the sternal angle in healthy people.
            </p>
        </div>
    </div>
    
        <style>
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.02); }
                100% { transform: scale(1); }
              }  
            @keyframes fadeIn {
               from { opacity: 0; transform: translateY(10px); }
               to { opacity: 1; transform: translateY(0); }
             }
         </style>
     `,

        "chest-pain": `
    <h3 style="color: #ff4757; margin-top: 0; text-align: center; font-weight: bold; text-shadow: 1px 1px 3px rgba(0,0,0,0.2); animation: pulse 2s infinite;">
        🫀 CHEST PAIN DIFFERENTIAL DIAGNOSIS 🫀
    </h3>
    <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
        <!-- Cardiac Ischemia -->
        <div style="background: linear-gradient(to right, #fff8e1, #ffecb3); padding: 15px; border-left: 5px solid #ffc107; margin-bottom: 15px; border-radius: 0 8px 8px 0; animation: fadeIn 1s;">
            <h4 style="color: #d32f2f; margin-top: 0; border-bottom: 2px dashed #d32f2f; padding-bottom: 5px;">Cardiac Ischemia</h4>
            <p style="margin-bottom: 0;">Chest pain interpreted to be from the heart—pressure, squeezing, crushing intense pain brought on by exertion, relieved by rest, and unrelated to position or breathing—or associated with heart murmur, irregular heartbeat, or abnormal electrocardiogram.</p>
        </div>
        
        <!-- Pulmonary Embolus -->
        <div style="background: linear-gradient(to right, #e3f2fd, #bbdefb); padding: 15px; border-left: 5px solid #2196f3; margin-bottom: 15px; border-radius: 0 8px 8px 0; animation: fadeIn 1.2s;">
            <h4 style="color: #1976d2; margin-top: 0; border-bottom: 2px dashed #1976d2; padding-bottom: 5px;">Pulmonary Embolus</h4>
            <p style="margin-bottom: 0;">Chest pain that is pleuritic and sudden, associated with acute shortness of breath, increased respiratory rate, and increased heart rate.</p>
        </div>
        
        <!-- Pericarditis/Pleuritis -->
        <div style="background: linear-gradient(to right, #e8f5e9, #c8e6c9); padding: 15px; border-left: 5px solid #4caf50; margin-bottom: 15px; border-radius: 0 8px 8px 0; animation: fadeIn 1.4s;">
            <h4 style="color: #2e7d32; margin-top: 0; border-bottom: 2px dashed #2e7d32; padding-bottom: 5px;">Pericarditis/Pleuritis</h4>
            <p style="margin-bottom: 0;">Chest pain that is sharp and pleuritic, increased with inspiration, worse when lying flat, and relieved by sitting forward.</p>
        </div>
        
        <!-- Pneumonia -->
        <div style="background: linear-gradient(to right, #f3e5f5, #e1bee7); padding: 15px; border-left: 5px solid #9c27b0; margin-bottom: 15px; border-radius: 0 8px 8px 0; animation: fadeIn 1.6s;">
            <h4 style="color: #7b1fa2; margin-top: 0; border-bottom: 2px dashed #7b1fa2; padding-bottom: 5px;">Pneumonia</h4>
            <p style="margin-bottom: 0;">Chest pain associated with fever, shortness of breath, chills, cough, and pleuritic pain.</p>
        </div>
        
        <!-- GERD -->
        <div style="background: linear-gradient(to right, #fff3e0, #ffe0b2); padding: 15px; border-left: 5px solid #ff9800; margin-bottom: 15px; border-radius: 0 8px 8px 0; animation: fadeIn 1.8s;">
            <h4 style="color: #e65100; margin-top: 0; border-bottom: 2px dashed #e65100; padding-bottom: 5px;">Gastroesophageal Reflux Disease (GERD)</h4>
            <p style="margin-bottom: 0;">Chest pain that is burning, brought on by eating, relieved by antacids, and associated with upset stomach and regurgitation <em>(→EMR GERD Template)</em>.</p>
        </div>
        
        <!-- Musculoskeletal -->
        <div style="background: linear-gradient(to right, #fbe9e7, #ffccbc); padding: 15px; border-left: 5px solid #ff5722; margin-bottom: 15px; border-radius: 0 8px 8px 0; animation: fadeIn 2s;">
            <h4 style="color: #bf360c; margin-top: 0; border-bottom: 2px dashed #bf360c; padding-bottom: 5px;">Musculoskeletal Pain</h4>
            <p style="margin-bottom: 0;">Chest pain associated with palpable muscular tenderness, history of chest injury, or repetitive muscle use.</p>
        </div>
        
        <!-- Asthma -->
        <div style="background: linear-gradient(to right, #e0f7fa, #b2ebf2); padding: 15px; border-left: 5px solid #00bcd4; margin-bottom: 15px; border-radius: 0 8px 8px 0; animation: fadeIn 2.2s;">
            <h4 style="color: #00838f; margin-top: 0; border-bottom: 2px dashed #00838f; padding-bottom: 5px;">Asthma Exacerbation</h4>
            <p style="margin-bottom: 0;">Acute shortness of breath with or without chest pain in patient with known asthma <em>(→EMR Asthma Template)</em>.</p>
        </div>
        
        <!-- COPD -->
        <div style="background: linear-gradient(to right, #efebe9, #d7ccc8); padding: 15px; border-left: 5px solid #795548; margin-bottom: 15px; border-radius: 0 8px 8px 0; animation: fadeIn 2.4s;">
            <h4 style="color: #4e342e; margin-top: 0; border-bottom: 2px dashed #4e342e; padding-bottom: 5px;">COPD Exacerbation</h4>
            <p style="margin-bottom: 0;">Increased shortness of breath with or without chest pain in patient with known COPD (possible respiratory failure with CO₂ retention) <em>(→EMR COPD Template)</em>.</p>
        </div>
        
        <!-- Heart Failure -->
        <div style="background: linear-gradient(to right, #eceff1, #cfd8dc); padding: 15px; border-left: 5px solid #607d8b; border-radius: 0 8px 8px 0; animation: fadeIn 2.6s;">
            <h4 style="color: #37474f; margin-top: 0; border-bottom: 2px dashed #37474f; padding-bottom: 5px;">Heart Failure</h4>
            <p style="margin-bottom: 0;">Shortness of breath made worse by lying down or with episodic occurrence at night (paroxysmal nocturnal dyspnea), with or without chest pain <em>(→EMR Heart Disease Template)</em>.</p>
        </div>
    </div>
    
    <style>
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
        }
        h4 {
            font-weight: bold;
            margin-bottom: 8px;
        }
        p {
            margin-top: 8px;
            line-height: 1.5;
        }
         </style>
     `,
     
         "cardiac-auscultation": `
          <h3 style="color: var(--primary-color); margin-top: 0;">A PRIMER ON CARDIAC AUSCULTATION</h3>
          <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
            <p><strong>First heart sound (S1)</strong>: Closure of atrial-ventricular valves - tricuspid (right heart) and mitral (left heart) valves. Best heard at apex.</p>
            
            <p><strong>Systole</strong>: The period between S1 and S2 when the heart muscles are contracting.</p>
            
            <p><strong>Second heart sound (S2)</strong>: Aortic and pulmonic valve (also called semi-lunar valves) closure, usually in this order. Best heard in the cephalad right (A2) and left (P2) rib interspaces.</p>
            
            <p><strong>Split S2</strong>: Normal with inspiration associated with increased filling of right ventricle = A2 followed by delayed P2.</p>
            
            <p><strong>Third heart sound (S3)</strong>: A physiologically normal ventricular filling sound in young people and with exercise best heard at apex.</p>
            
            <p><strong>Diastole</strong>: The period between S2 and S1 when the heart muscles are at rest.</p>
            
            <p><strong>Atrial-ventricular valves</strong>: Open silently in diastole.</p>
            
            <p><strong>Murmurs</strong>: The significance of murmurs is determined by their locations, character, timing, and intensities. Systolic murmurs are often innocent or not indicative of heart disease, while diastolic murmurs are almost always pathologic.</p>
            
            <h4 style="color: var(--primary-color); margin-bottom: 5px;">Auscultation sites:</h4>
            <ul style="margin-top: 5px;">
              <li><strong>Right second rib interspace</strong> (between the second and third ribs, to the right of and next to the sternum) - closest to the aortic valve</li>
              <li><strong>Left second interspace</strong> (between the second and third ribs, to the left of and next to the sternum) - closest to the pulmonic valve</li>
              <li><strong>Left lower sternal border</strong> - closest to the tricuspid valve</li>
              <li><strong>Apex</strong> (approximately between the 5th and 6th left ribs 3 inches from the left sternal border, where the heart beat can most easily be felt) - closest to the mitral valve</li>
            </ul>
            
            <h4 style="color: var(--primary-color); margin-bottom: 5px;">Key Points:</h4>
            <ul style="margin-top: 5px;">
              <li>Use the diaphragm of the stethoscope for high-pitched sounds (S1, S2, murmurs of aortic/pulmonic stenosis, mitral regurgitation)</li>
              <li>Use the bell for low-pitched sounds (S3, S4, murmur of mitral stenosis)</li>
              <li>Have patient breathe normally, then hold breath in expiration to listen carefully</li>
              <li>Compare auscultation findings with pulse palpation for timing</li>
            </ul>
          </div>
        `,
        "chest-pain-types": `
          <h3 style="color: var(--primary-color);">Chest Pain Types and Causes</h3>
          <div style="margin-top: 15px; line-height: 1.6;">
            <p><strong>Chest pain interpreted to be from the heart</strong>—pressure, squeezing crushing intense pain brought on by exertion, relieved by rest, and unrelated to position or breathing—or heart murmur, irregular heartbeat, abnormal electrocardiogram, is chest pain from <strong>heart disease</strong>.</p>
            
            <p><strong>Chest pain, which is pleuritic and sudden, and associated with acute shortness of breath, increased respiratory and heart rates, may be from a <strong>pulmonary embolus</strong>.</p>
            
            <p><strong>Chest pain, which is sharp and pleuritic, increased with inspiration, and worse when lying flat, and relieved sitting forward may be from <strong>pericarditis or pleuritis</strong>.</p>
            
            <p><strong>Chest pain associated with fever, shortness of breath, chills, cough, and pleuritic pain may be from <strong>pneumonia</strong>.</p>
            
            <p><strong>Chest pain, which is burning, brought on by eating, relieved by antacids, and associated with upset stomach and regurgitation, is likely to be from <strong>gastroesophageal reflux disease (GERD)</strong> → <strong>EMR GERD Template</strong>.</p>
            
            <p><strong>Chest pain associated with palpable muscular tenderness, a history of chest injury, and repetitive muscle use is likely <strong>muscle pain</strong>.</p>
            
            <p><strong>Acute shortness of breath with or without chest pain in an individual with known asthma is likely to be an acute exacerbation of asthma → <strong>EMR Asthma template</strong>.</p>
            
            <p><strong>Increased shortness of breath with or without chest pain in a patient with known COPD may be because of respiratory failure with CO2 retention → <strong>EMR COPD Template</strong>.</p>
            
            <p><strong>Shortness of breath made worse by lying down or with episodic occurrence at night with or without chest pain suggests heart failure → <strong>EMR Heart disease template</strong>.</p>
          </div>
        `,
           
        "heart-sounds": `
          <h3 style="color: var(--primary-color);">A PRIMER ON CARDIAC AUSCULTATION</h3>
          <div style="margin-top: 15px; line-height: 1.6;">
            <p><strong>First heart sound (S1)</strong> = closure of atrial-ventricular valves = tricuspid (right heart) and mitral (left heart) valves. Best heard at apex.</p>
            
            <p><strong>Systole</strong>: The period between S1 and S2 when the heart muscles are contracting.</p>
            
            <p><strong>Second heart sound (S2)</strong> = Aortic and pulmonic valve (also called semi-lunar valves) closure, usually in this order. Best heard in the cephalad right (A2) and left (P2) rib interspaces.</p>
            
            <p><strong>Split S2</strong> = normal with inspiration associated with increased filling of right ventricle = A2 followed by delayed P2.</p>
            
            <p><strong>Third heart sound (S3)</strong> = A physiologically normal ventricular filling sound in young people and with exercise best heard at apex.</p>
            
            <p><strong>Diastole</strong>: The period between S2 and S1 when the heart muscles are at rest. Atrial-ventricular valves open silently in diastole.</p>
            
            <p><strong>Murmurs</strong>: The significance of murmurs is determined by their locations, character, timing, and intensities. Systolic murmurs are often innocent or not indicative of heart disease, while diastolic murmurs are almost always pathologic.</p>
            
            <h4 style="color: var(--secondary-color); margin-top: 15px;">Auscultation sites:</h4>
            <ul>
              <li><strong>Right second rib interspace</strong> (that is between the second and third ribs, to the right of and next to the sternum) (closest to the aortic valve)</li>
              <li><strong>Left second interspace</strong> (that is between the second and third ribs, to the left of and next to the sternum) (closest to the pulmonic valve)</li>
              <li><strong>Left lower sternal border</strong> (closest to the tricuspid valve)</li>
              <li><strong>Apex</strong> (or bottom) (approximately between the 5th and 6th left ribs 3 inches from the left sternal border, where the heart beat can most easily be felt) (closest to the mitral valve)</li>
            </ul>
          </div>
        `,
        "jvp": `
          <h3 style="color: var(--primary-color);">Jugular Venous Pressure</h3>
          <div style="margin-top: 15px; line-height: 1.6;">
            <p>To estimate jugular venous pressure, the patient should be positioned in a semi-recumbent position (at 45°) and asked to turn their head slightly to the left. The internal jugular vein, running between the medial end of the clavicle and the ear lobe, should be inspected for evidence.</p>
            
            <p>The jugular venous pressure is easiest to observe if one looks along the surface of the sternocleidomastoid muscle, as it is easier to appreciate the movement relative to the neck when looking from the side (as opposed to looking at the surface at a 90 degree angle).</p>
            
            <p>The filling level of the jugular vein should be less than 4 centimeters vertical height above the sternal angle in healthy people.</p>
          </div>
        `,
        "homan-sign": `
          <h3 style="color: var(--primary-color);">Homan's Sign</h3>
          <div style="margin-top: 15px; line-height: 1.6;">
            <p>Homan's sign is tested by passively dorsiflexing the patient's foot with one hand and squeezing the calf with the other hand.</p>
            
            <p>A positive Homan's sign is pain in the calf on this maneuver and may suggest deep vein thrombosis (DVT), though it has limited sensitivity and specificity for DVT diagnosis.</p>
          </div>
        `,
        "lead-exposure": `
          <h3 style="color: var(--primary-color);">Lead Exposure References</h3>
          <div style="margin-top: 15px; line-height: 1.6;">
            <p><strong>Ericson, B. et al:</strong> Blood lead levels in low- and middle-income countries: a systematic review. Lancet Planet Health. 2021; 5(3): e145-e153.</p>
            
            <p><strong>Forsyth, J.E. et al:</strong> Sources of Blood Lead Exposure in Rural Bangladesh Environ Sci Technol 2019. Sept 17;53(19):11429–11436. doi: <a href="https://doi.org/10.1021/acs.est.9b00744" target="_blank">10.1021/acs.est.9b00744</a></p>
          </div>
        `,
        "ascvd-risk": `
          <h3 style="color: var(--primary-color);">ASCVD Risk Estimator</h3>
          <div style="margin-top: 15px; line-height: 1.6;">
            <p>Tools: <a href="https://tools.acc.org/ASCVD-Risk-Estimator-Plus/" target="_blank">tools.acc.org/ASCVD-Risk-Estimator-Plus/</a> (Designed for use with patients not confirmed to have ASCVD)</p>
            
            <p>Use of this tool requires usual historical and PE data plus Total cholesterol, HDL cholesterol and LDL cholesterol.</p>
          </div>
          `
      };

      // When user clicks on an info link, open the modal
      if (infoLinks.length && modal && infoContent) {
        infoLinks.forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            const infoKey = this.getAttribute('data-info');
            if (infoData[infoKey]) {
              infoContent.innerHTML = infoData[infoKey];
              modal.style.display = "block";
            }
          });
        });
      }

      // When user clicks on (x), close the modal
      if (span) {
        span.onclick = function() {
          modal.style.display = "none";
        }
      }

      // When user clicks anywhere outside the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      // Navigation within the form
      const tocLinks = document.querySelectorAll('.template-toc a');
      if (tocLinks.length) {
        tocLinks.forEach(anchor => {
          anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
              // Add highlight to the section
              targetElement.style.backgroundColor = '#f5f5f5';
              setTimeout(() => {
                targetElement.style.backgroundColor = "";
              }, 2000);
            }
          });
        });
      }
           // Navbar functionality
  const vibrantNav = document.querySelector('.vibrant-nav-container');
  const navHeader = document.querySelector('.vibrant-nav-header');
  
  // Set animation delays for each link
  document.querySelectorAll('.vibrant-nav-link').forEach((link, index) => {
    link.style.setProperty('--i', index);
  });
  
  // Toggle dropdown
  if (navHeader) {
    navHeader.addEventListener('click', function(e) {
      e.stopPropagation();
      vibrantNav.classList.toggle('active');
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function() {
    if (vibrantNav) {
      vibrantNav.classList.remove('active');
    }
  });
  
  // Highlight current page
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.vibrant-nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('current');
      link.innerHTML = '<i>✨</i> ' + link.textContent.replace('🩺 ', '').replace('🌸 ', '').replace('🤕 ', '');
    }
  });
    });