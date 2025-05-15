             document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const today = new Date();
    const visitDateInput = document.getElementById('visit-date');
    if (visitDateInput) {
        visitDateInput.valueAsDate = today;
    }

    // Improved toggle display function
    function toggleDisplay(triggerSelector, targetId, checkValue = true) {
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

        // Initialize
        updateDisplay();
    }

    // Set up all conditional displays
    toggleDisplay('input[name="allergies"]', 'allergies-details', 'yes');
    toggleDisplay('input[name="exposure"]', 'exposure-details', 'yes');
    toggleDisplay('input[name="family"]', 'family-details', 'yes');
    toggleDisplay('input[name="xray"]', 'xray-details', 'yes');
    toggleDisplay('input[name="hemoglobin"]', 'hemoglobin-details', 'yes');
    toggleDisplay('input[name="eosinophil"]', 'eosinophil-details', 'yes');
    toggleDisplay('input[name="oximetry"]', 'oximetry-details', 'yes');
    toggleDisplay('input[name="spirometry"]', 'spirometry-details', 'yes');
    toggleDisplay('input[name="peakflow"]', 'peakflow-details', 'yes');
    toggleDisplay('input[name="treatment"]', 'treatment-details', 'other');
    toggleDisplay('input[name="murmurs-present"]', 'murmurs-present-details', 'present');
    toggleDisplay('input[name="testing"]', 'testing-details', 'specific');
    toggleDisplay('input[name="tele"]', 'tele-details', 'yes');
    toggleDisplay('input[name="hypertension"]', 'hypertension-details', 'yes');
    
    // New Spirometry radio button functionality
    toggleDisplay('input[name="spirometry_type"]', 'peak-flow-container', 'fev1');
    

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

    // Toggle display for consultant name
    const teleconsultRadios = document.querySelectorAll('input[name="teleconsult"]');
    const consultantNameInput = document.getElementById('consultant-name');

    function toggleConsultantName() {
        const selected = document.querySelector('input[name="teleconsult"]:checked');
        if (selected) {
            const show = selected.value === 'yes';
            consultantNameInput.style.display = show ? 'block' : 'none';
        }
    }

    if (teleconsultRadios.length && consultantNameInput) {
        teleconsultRadios.forEach(radio => {
            radio.addEventListener('change', toggleConsultantName);
        });
        toggleConsultantName();
    }

    // Info modal functionality
    const modal = document.getElementById("infoModal");
    const infoLinks = document.querySelectorAll(".info-link");
    const infoContent = document.getElementById("infoContent");
    const span = document.getElementsByClassName("close")[0];

    // Info content definitions - Updated with cardiac and lung auscultation info
    const infoData = {
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
        "lung-auscultation": `
            <h3 style="color: var(--primary-color); margin-top: 0;">LUNG AUSCULTATION WITH AMPLIFIED STETHOSCOPE</h3>
            <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
                <h4 style="color: var(--primary-color); margin-bottom: 5px;">Technique:</h4>
                <ul style="margin-top: 5px;">
                    <li>Have patient sit upright if possible</li>
                    <li>Listen through clothing creates artifact. Place stethoscope directly on skin.</li>
                    <li>Compare symmetrical areas side-to-side</li>
                    <li>Listen to at least one full respiratory cycle at each site</li>
                    <li>Systematically examine all lung zones (upper, middle, lower; anterior, lateral, posterior)</li>
                </ul>
                
                <h4 style="color: var(--primary-color); margin-bottom: 5px;">Normal Breath Sounds:</h4>
                <ul style="margin-top: 5px;">
                    <li><strong>Vesicular</strong>: Soft, low-pitched over most lung fields</li>
                    <li><strong>Bronchial</strong>: Louder, higher-pitched over trachea</li>
                    <li><strong>Bronchovesicular</strong>: Intermediate sounds near large airways</li>
                </ul>
                
                <h4 style="color: var(--primary-color); margin-bottom: 5px;">Abnormal Breath Sounds:</h4>
                <ul style="margin-top: 5px;">
                    <li><strong>Wheezes</strong>: High-pitched musical sounds from narrowed airways (asthma, COPD)</li>
                    <li><strong>Rhonchi</strong>: Low-pitched snoring from secretions in large airways</li>
                    <li><strong>Crackles</strong>: Discontinuous popping sounds from fluid in alveoli or opening of collapsed airways</li>
                    <li><strong>Stridor</strong>: Harsh sound from upper airway obstruction</li>
                    <li><strong>Pleural rub</strong>: Creaking sound from inflamed pleural surfaces</li>
                </ul>
                
                <h4 style="color: var(--primary-color); margin-bottom: 5px;">Special Maneuvers:</h4>
                <ul style="margin-top: 5px;">
                    <li><strong>Forced expiration</strong>: Helps detect subtle wheezing</li>
                    <li><strong>Whispered pectoriloquy</strong>: Increased transmission suggests consolidation</li>
                    <li><strong>Egophony</strong>: "E" to "A" change suggests consolidation</li>
                </ul>
            </div>
        `,
        "asthma-guidelines": "Asthma management guidelines recommend a stepwise approach to treatment based on symptom control and risk factors. Key points include:<br><br>1. Regular assessment of symptom control and risk factors<br>2. Patient education and self-management<br>3. Avoidance of triggers<br>4. Pharmacological therapy tailored to disease severity",
        "inhaler-technique": "Proper inhaler technique is critical for effective asthma management:<br><br>1. Remove cap and shake inhaler<br>2. Breathe out fully away from inhaler<br>3. Place mouthpiece between teeth and seal lips around it<br>4. Start to breathe in slowly and press canister once<br>5. Continue to breathe in slowly and deeply<br>6. Hold breath for 10 seconds if possible",
        "wheezing": "Wheezing characteristics in asthma:<br><br>- High-pitched whistling sounds during breathing<br>- Typically more pronounced during expiration<br>- May be diffuse or localized depending on severity<br>- Can vary in intensity throughout the day<br>- Often worse at night or early morning",
        "spirometry": "Spirometry interpretation for asthma:<br><br>- FEV1/FVC ratio < 0.7 suggests airflow obstruction<br>- Improvement in FEV1 >12% and 200mL after bronchodilator indicates reversible obstruction<br>- Monitoring FEV1 over time helps assess disease control<br>- Normal spirometry doesn't rule out asthma (may need challenge tests)",
        "medical-interventions": "The best treatment plans come from following clinical practice guidelines. A good summary is at New England Journal of Medicine 2023.389:1023-31",
        "patient-education": "<strong>Asthma is a complex, chronic condition.</strong> Successful management can only occur with regular periodic check-up visits with the same expert health care provider.<br><br><strong>Goals of management:</strong><br>#1. Reduce risk of acute attacks→<br>&nbsp;&nbsp;&nbsp;&nbsp;*identify usual causes and ways to limit these (like masking)<br><br>#2. Maximize control of symptoms→<br>&nbsp;&nbsp;&nbsp;&nbsp;*No waking up at night with coughing and wheezing.<br>&nbsp;&nbsp;&nbsp;&nbsp;*No limitation of usual activities<br>&nbsp;&nbsp;&nbsp;&nbsp;*Confirm return to normal of spirometric measures (FV, and Fev1) and no wheezing at all over all lung fields.<br><br>#3. Minimize the side effects and costs of medications."
    };

    // When user clicks on an info link, open the modal
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

    // Get the radio buttons and details div (murmurs)
    const murmursRadios = document.querySelectorAll('input[name="murmurs-present"]');
    const murmursDetails = document.getElementById('murmurs-present-details');

    // Add event listeners to each radio button
    murmursRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'present') {
                murmursDetails.style.display = 'block';
            } else {
                murmursDetails.style.display = 'none';
            }
        });
    });

    // Navigation within the form
    const tocLinks = document.querySelectorAll('.template-toc a');
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

    // Initialize all hidden fields and trigger change events
    document.querySelectorAll('.hidden').forEach(el => {
        el.style.display = 'none';
    });

    document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(el => {
        if (el.checked) el.dispatchEvent(new Event('change'));
    });

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