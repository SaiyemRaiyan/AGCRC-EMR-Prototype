document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const today = new Date();
    const visitDateInput = document.getElementById('visit-date');
    if (visitDateInput) {
        visitDateInput.valueAsDate = today;
    }

    // Toggle display function for conditional sections
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

        updateDisplay();
    }

    // Set up all conditional displays
    toggleDisplay('input[name="new-problem"]', 'new-problem-date', 'yes');
    toggleDisplay('input[name="left-chest"]', 'pain-radiation', 'yes');
    toggleDisplay('input[name="pain-swallowing"]', 'constant-pain', 'yes');
    toggleDisplay('input[name="blockage"]', 'blockage-liquids', 'yes');
    toggleDisplay('input[name="murmurs-present"]', 'murmurs-present-details', 'present');
    toggleDisplay('input[name="right-lung"]', 'right-lung-details', 'abnormal');
    toggleDisplay('input[name="left-lung"]', 'left-lung-details', 'abnormal');
    toggleDisplay('input[name="further-tests"]', 'specific-tests', 'specific');
    toggleDisplay('input[name="teleconsult"]', 'teleconsult-details', 'yes');
    toggleDisplay('input[name="other-test"]', 'other-test-details', true);

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
    const span = document.getElementsByClassName("close")[0];

    // Info content definitions
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

        "gerd-guidelines": `
            <div style="font-size: 22px; line-height: 1.6;">
                <h3 style="color: var(--primary-color); margin-bottom: 15px;">GERD Diagnosis Guidelines</h3>
                <p>Diagnosis of GERD is typically based on:</p>
                <ol style="padding-left: 25px;">
                    <li>Characteristic symptoms (heartburn, regurgitation)</li>
                    <li>Response to empiric PPI therapy</li>
                    <li>Endoscopic evidence of esophageal injury</li>
                    <li>Ambulatory pH monitoring when diagnosis is uncertain</li>
                </ol>
                <p style="margin-top: 15px;"><strong>Typical symptoms:</strong> Heartburn, regurgitation, dysphagia</p>
                <p><strong>Atypical symptoms:</strong> Chronic cough, laryngitis, asthma, chest pain</p>
            </div>
        `,
        "red-flags": `
            <div style="font-size: 22px; line-height: 1.6;">
                <h3 style="color: var(--danger-color); margin-bottom: 15px;">GERD Red Flags</h3>
                <p>Warning signs that suggest complications or alternative diagnoses:</p>
                <ul style="padding-left: 25px;">
                    <li>Dysphagia (difficulty swallowing)</li>
                    <li>Odynophagia (painful swallowing)</li>
                    <li>Unexplained weight loss</li>
                    <li>Gastrointestinal bleeding</li>
                    <li>Anemia</li>
                    <li>Persistent vomiting</li>
                    <li>Family history of upper GI cancer</li>
                </ul>
                <div style="background-color: #ffeeee; padding: 15px; border-left: 3px solid var(--danger-color); margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 0;">Patients with red flags should be referred for endoscopy to rule out serious conditions like esophageal cancer.</p>
                </div>
            </div>
        `,
        "treatment-options": `
            <div style="font-size: 22px; line-height: 1.6;">
                <h3 style="color: var(--primary-color); margin-bottom: 15px;">GERD Treatment Options</h3>
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Step-up approach:</h4>
                    <ol style="padding-left: 25px;">
                        <li><strong>Lifestyle modifications</strong> (first-line for all patients)</li>
                        <li><strong>Antacids/alginates</strong> (as-needed for mild symptoms)</li>
                        <li><strong>H2RAs</strong> (e.g., famotidine for mild-moderate symptoms)</li>
                        <li><strong>PPIs</strong> (e.g., omeprazole for moderate-severe symptoms)</li>
                    </ol>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Maintenance therapy:</h4>
                    <ul style="padding-left: 25px;">
                        <li>Lowest effective dose of acid suppression</li>
                        <li>Intermittent or on-demand therapy for many patients</li>
                        <li>Consider step-down approach after initial healing</li>
                    </ul>
                </div>
                <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color);">
                    <p><strong>Note:</strong> PPIs are generally safe but long-term use may be associated with small risks of fractures, infections, and nutrient deficiencies.</p>
                </div>
            </div>
        `,
        "lifestyle-modifications": `
            <div style="font-size: 22px; line-height: 1.6;">
                <h3 style="color: var(--primary-color); margin-bottom: 15px;">Lifestyle Modifications for GERD</h3>
                <p>Recommended lifestyle changes to reduce GERD symptoms:</p>
                <ul style="padding-left: 25px;">
                    <li><strong>Weight loss</strong> if overweight or obese</li>
                    <li><strong>Elevate head of bed</strong> 6-8 inches</li>
                    <li>Avoid lying down within <strong>2-3 hours after meals</strong></li>
                    <li>Avoid large, fatty meals</li>
                    <li><strong>Smoking cessation</strong></li>
                    <li>Avoid known dietary triggers:
                        <ul style="padding-left: 20px; margin-top: 5px;">
                            <li>Caffeine</li>
                            <li>Chocolate</li>
                            <li>Alcohol</li>
                            <li>Mint</li>
                            <li>Spicy foods</li>
                            <li>Citrus</li>
                            <li>Tomato-based foods</li>
                        </ul>
                    </li>
                </ul>
                <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color); margin-top: 15px;">
                    <p>While lifestyle changes alone may not control symptoms in all patients, they can reduce medication requirements and improve quality of life.</p>
                </div>
            </div>
        `,
        "abdominal-exam": `
            <div style="font-size: 22px; line-height: 1.6;">
                <h3 style="color: var(--primary-color); margin-bottom: 15px;">Abdominal Examination for GERD</h3>
                <p>Key components of abdominal examination in GERD patients:</p>
                <ol style="padding-left: 25px;">
                    <li><strong>Inspection:</strong> Look for distention, scars, striae, visible masses</li>
                    <li><strong>Auscultation:</strong> Assess bowel sounds (normal, hyperactive, hypoactive)</li>
                    <li><strong>Percussion:</strong> Assess liver span, splenic dullness, presence of ascites</li>
                    <li><strong>Palpation:</strong>
                        <ul style="padding-left: 20px; margin-top: 5px;">
                            <li>Light palpation for tenderness</li>
                            <li>Deep palpation for masses or organomegaly</li>
                            <li>Assess for guarding or rebound tenderness</li>
                        </ul>
                    </li>
                </ol>
                <div style="margin-top: 15px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Special considerations:</h4>
                    <ul style="padding-left: 25px;">
                        <li>Epigastric tenderness may suggest gastritis or PUD</li>
                        <li>Hepatomegaly or splenomegaly suggests alternative diagnoses</li>
                        <li>Rebound tenderness suggests peritonitis</li>
                    </ul>
                </div>
            </div>
        `,
        "patient-education": `
            <div style="font-size: 22px; line-height: 1.6;">
                <h3 style="color: var(--primary-color); margin-bottom: 15px;">Patient Education for GERD</h3>
                <p>Key points to discuss with GERD patients:</p>
                <ul style="padding-left: 25px;">
                    <li>Explanation of GERD and its chronic nature</li>
                    <li>Importance of adherence to lifestyle modifications</li>
                    <li>Proper use of medications (timing relative to meals)</li>
                    <li>Warning signs requiring medical attention:
                        <ul style="padding-left: 20px; margin-top: 5px;">
                            <li>Progressive dysphagia</li>
                            <li>Weight loss</li>
                            <li>Hematemesis or melena</li>
                            <li>Persistent symptoms despite treatment</li>
                        </ul>
                    </li>
                    <li>Importance of follow-up for symptom monitoring</li>
                </ul>
                <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color); margin-top: 15px;">
                    <p><strong>Note:</strong> Patient education improves adherence to therapy and helps identify complications early.</p>
                </div>
            </div>
        `,
        "reference": `
            <div style="font-size: 22px; line-height: 1.6;">
                <h3 style="color: var(--primary-color); margin-bottom: 15px;">Reference Article</h3>
                <p><strong>Mittal R, Vaezi MF. Esophageal Motility Disorders and Gastroesophageal Reflux Disease. N Engl J Med. 2020 Nov 12;383(20):1961-1972.</strong></p>
                <p>Key points from this reference:</p>
                <ul style="padding-left: 25px;">
                    <li>Comprehensive review of GERD pathophysiology</li>
                    <li>Diagnostic algorithm for GERD and motility disorders</li>
                    <li>Evidence-based treatment recommendations</li>
                    <li>Management of refractory GERD</li>
                </ul>
                <p style="margin-top: 15px;">DOI: <a href="https://doi.org/10.1056/NEJMra2000328" target="_blank">10.1056/NEJMra2000328</a></p>
            </div>
        `,
        "recommendations": `
        <div style="font-size: 22px; line-height: 1.6;">
            <h3 style="color: var(--primary-color); margin-bottom: 15px;">Recommended Medical Interventions</h3>
            <ul style="padding-left: 25px; list-style-type: none;">
                <li style="margin-bottom: 10px;">
                    <strong>Antacids</strong> after meals and at bedtime
                </li>
                <li style="margin-bottom: 10px;">
                    <strong>H2 receptor blockers</strong> (mild disease)
                    <div style="margin-left: 20px; margin-top: 5px;">
                        Famotidine 10 mg or 20 mg once or twice daily<br>
                        <small>Step wise dose increases and slow taper with disease control.</small>
                    </div>
                </li>
                <li style="margin-bottom: 10px;">
                    <strong>Proton-pump inhibitor</strong> (severe disease)
                    <div style="margin-left: 20px; margin-top: 5px;">
                        Omeprazole 20-40 mg daily-twice daily<br>
                        <small>Step wise dose increase with 4-week treatment trial.</small><br>
                        <small style="color: var(--danger-color);">CANNOT USE effectively as necessary.</small>
                    </div>
                </li>
            </ul>
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
    if (span && modal) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    // When user clicks anywhere outside the modal, close it
    if (modal) {
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    toggleDisplay('input[name="epigastric"]', 'epigastric-describe', 'yes');  //Epigastric describe
    toggleDisplay('input[name="gnawing"]', 'gnawing-describe', 'yes');     //Gnawingdescribe

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
           // Function to handle both the description and peptic ulcer text
      document.querySelectorAll('input[name="gnawing"]').forEach(radio => {
        radio.addEventListener('change', function() {
        if(this.value === 'yes') {
            document.getElementById('gnawing-describe').style.display = 'block';
            document.getElementById('peptic-ulcer-text').style.display = 'block';
        } else {
            document.getElementById('gnawing-describe').style.display = 'none';
            document.getElementById('peptic-ulcer-text').style.display = 'none';
        }
    });
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