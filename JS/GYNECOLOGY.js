    document.addEventListener('DOMContentLoaded', function() {
        // Set current date
        document.getElementById('visit-date').valueAsDate = new Date();
        
        // Create examination references modal panel
        const refPanel = document.createElement('div');
        refPanel.id = "refPanel";
        refPanel.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            z-index: 1000;
            overflow-y: auto;
            padding: 20px;
            box-sizing: border-box;
        `;
        
        const panelContent = document.createElement('div');
        panelContent.style.cssText = `
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            max-width: 800px;
            margin: 40px auto;
            box-shadow: 0 0 20px rgba(0,0,0,0.3);
            font-size: 22px;
            line-height: 1.6;
        `;
        
        const closeBtn = document.createElement('span');
        closeBtn.className = "close";
        closeBtn.innerHTML = "&times;";
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            color: white;
            font-size: 40px;
            cursor: pointer;
        `;
        
        refPanel.appendChild(closeBtn);
        refPanel.appendChild(panelContent);
        document.body.appendChild(refPanel);
    
        // Examination References content
        const examRefData = {
            "lid-lag-info": "Lid lag information content...",
            "pmi-info": "Point of Maximal Impulse information content...",
            "s1-info": "Heart Sound S1 information content...",
            "s2-info": "Heart Sound S2 information content...",
            "split-s2-info": "Split S2 information content...",
            "s3-info": "Heart Sound S3 information content...",
            "murmurs-info": "Heart Murmurs information content...",
            "auscultation-sites": "Auscultation Sites information content...",
            "wet-mount": `
                <h3 style="color: var(--primary-color); margin-bottom: 20px;">Wet Mount</h3>
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Purpose:</h4>
                    <p>For Candidiasis, Trichomoniasis, Bacterial vaginosis.</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Materials Needed:</h4>
                    <ul>
                        <li>Slides</li>
                        <li>Test tube with minimal saline</li>
                        <li>Cotton swab</li>
                        <li>Second test tube with 10% KOH</li>
                    </ul>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Procedure:</h4>
                    <ol>
                        <li>Take swab from vagina</li>
                        <li>Prepare two slides - one with saline, one with KOH</li>
                        <li>Examine under microscope</li>
                    </ol>
                </div>
            `,
            "hpv-testing": `
                <h3 style="color: var(--primary-color); margin-bottom: 20px;">HPV Testing Sample Taken</h3>
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Sampling Technique:</h4>
                    <p>Take samples from the junction of the smooth pink squamous epithelium of the vagina extending onto the cervix and the granular darker red columnar epithelium extending from the uterus into the cervix.</p>
                </div>
                
                <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color); margin-bottom: 20px;">
                    <p><strong>Note:</strong> This junction moves with age. Take samples from and from inside and outside the cervical os.</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Procedure:</h4>
                    <ol>
                        <li>Insert speculum to visualize cervix</li>
                        <li>Use brush to sample transformation zone</li>
                        <li>Place sample in appropriate medium</li>
                        <li>Label and send to lab</li>
                    </ol>
                </div>
            `,
            "hpv-info": `
        <h3 style="color: #7b1fa2; margin-top: 0; text-align: center; font-weight: bold; text-shadow: 1px 1px 3px rgba(123,31,162,0.2); animation: pulse 2s infinite;">
        HPV Sampling Procedure
        </h3>
        <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
        <div style="background: linear-gradient(to right, #f3e5f5, #e1bee7); padding: 15px; border-left: 5px solid #9c27b0; border-radius: 0 8px 8px 0; animation: fadeIn 1s;">
            <h4 style="color: #4a148c; margin-top: 0; border-bottom: 2px dashed #ba68c8; padding-bottom: 5px;">Sampling Technique</h4>
            <p style="margin-bottom: 10px; color: #4a148c;">
                Take samples from the junction of the smooth pink squamous epithelium of the vagina extending onto the cervix and the granular darker red columnar epithelium extending from the uterus into the cervix.
            </p>
            
            <h4 style="color: #4a148c; margin-top: 15px; border-bottom: 2px dashed #ba68c8; padding-bottom: 5px;">Important Notes</h4>
            <ul style="margin-bottom: 0; color: #4a148c; padding-left: 20px;">
                <li style="margin-bottom: 8px;">This junction moves with age (transformation zone)</li>
                <li style="margin-bottom: 8px;">Sample both inside and outside the cervical os</li>
                <li>Use proper sampling brushes for optimal cell collection</li>
            </ul>
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
        h4 {
            font-weight: bold;
            margin-bottom: 8px;
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
            `
        };
    
        // Set up click handlers for examination reference items
        document.querySelectorAll('.info-link').forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const refKey = this.getAttribute('data-info');
                
                if (examRefData[refKey]) {
                    panelContent.innerHTML = examRefData[refKey];
                    refPanel.style.display = "block";
                    refPanel.scrollTo(0, 0);
                }
            });
        });
    
        // Close panel when clicking X or outside
        closeBtn.onclick = function() {
            refPanel.style.display = "none";
        }
        
        refPanel.onclick = function(e) {
            if (e.target === refPanel) {
                refPanel.style.display = "none";
            }
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
        toggleDisplay('input[name="breast-problem"]', 'breast-problem-details', 'yes');
        toggleDisplay('input[name="discharge-speculum"]', 'discharge-details', 'yes');
        toggleDisplay('input[name="adnexae-masses"]', 'adnexae-details', 'yes');
        toggleDisplay('input[name="left-axilla"]', 'left-axilla-details', 'yes');
        toggleDisplay('input[name="murmurs-present"]', 'murmurs-present-details', 'present');
        toggleDisplay('input[name="right-axilla"]', 'right-axilla-details', 'yes');
        toggleDisplay('input[name="teleconsult"]', 'teleconsultant-details', 'done');
        toggleDisplay('input[name="specialist-consult"]', 'specialist-details', 'yes');
        toggleDisplay('input[name="appointment-made"]', 'appointment-date', 'yes');
        toggleDisplay('input[name="community-health"]', 'community-purpose', 'yes');
    
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
        document.getElementById('save-btn')?.addEventListener('click', function() {
            if (validateForm()) {
                alert('Form data saved successfully!');
            }
        });
        
        document.getElementById('submit-btn')?.addEventListener('click', function() {
            if (validateForm()) {
                if (confirm('Are you sure you want to submit this to EMR?')) {
                    alert('Form submitted to EMR successfully!');
                }
            }
        });
        
        document.getElementById('print-btn')?.addEventListener('click', function() {
            window.print();
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

    
        // Form validation
        function validateForm() {
            let isValid = true;
            document.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields');
                return false;
            }
            return true;
        }
    
        // Initialize all hidden fields and trigger change events
        document.querySelectorAll('.hidden').forEach(el => {
            el.style.display = 'none';
        });
        
        document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(el => {
            if (el.checked) el.dispatchEvent(new Event('change'));
        });
    });
    
    function toggleProcedure(id) {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = element.style.display === 'block' ? 'none' : 'block';
        }
    }

    function toggleTrichomoniasisSuggestion(radio) {
        const suggestionBox = radio.closest('.form-group').querySelector('.trichomoniasis-suggestion');
        if (radio.value === 'yes') {
            suggestionBox.style.display = 'block';
        } else {
            suggestionBox.style.display = 'none';
        }
    }
    
    function toggleAdnexaeDescription(radio) {
        const descriptionBox = radio.closest('.form-group').querySelector('.adnexae-description');
        if (radio.value === 'yes') {
            descriptionBox.style.display = 'block';
        } else {
            descriptionBox.style.display = 'none';
        }
    }