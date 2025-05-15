        document.addEventListener('DOMContentLoaded', function() {
            // Set current date
            const today = new Date();
            const visitDateInput = document.getElementById('visit-date');
            if (visitDateInput) {
                visitDateInput.valueAsDate = today;
            }

            // Calculate years with hypertension
            const hypertensionYearInput = document.querySelector('input[type="number"][placeholder="year"]');
            const hypertensionYearsSpan = document.getElementById('hypertension-years');
            
            if (hypertensionYearInput && hypertensionYearsSpan) {
                hypertensionYearInput.addEventListener('change', function() {
                    const year = parseInt(this.value);
                    if (!isNaN(year) && year > 1900 && year <= today.getFullYear()) {
                        const yearsWithHypertension = today.getFullYear() - year;
                        hypertensionYearsSpan.textContent = `→ Number of years with hypertension: ${yearsWithHypertension}`;
                    }
                });
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
            toggleDisplay('input[name="pregnant"]', 'woman-options', 'yes');
            toggleDisplay('input[name="past-contraceptives"]', 'contraceptive-years', 'yes');
            toggleDisplay('input[name="smoking"]', 'smoking-details', 'yes');
            toggleDisplay('input[name="hypertension-treatment"]', 'hypertension-treatment-other', 'other');
            toggleDisplay('input[name="right-lung"]', 'right-lung-details', 'abnormal');
            toggleDisplay('input[name="left-lung"]', 'left-lung-details', 'abnormal');
            toggleDisplay('input[name="further-tests"]', 'specific-tests', 'specific');
            toggleDisplay('input[name="teleconsult"]', 'teleconsult-details', 'yes');

            // BMI calculation
            const weightInput = document.getElementById('weight');
            const heightInput = document.getElementById('height');
            const bmiInput = document.getElementById('bmi');
            const summaryWaistHip = document.getElementById('summary-waist-hip');

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
                        if (summaryWaistHip) {
                            summaryWaistHip.value = ratio;
                        }
                    } else {
                        ratioDisplay.textContent = "";
                        if (summaryWaistHip) {
                            summaryWaistHip.value = "";
                        }
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
            // Left arm BP average
            const bpLeftSystolic1 = document.getElementById('bp-left-systolic1');
            const bpLeftDiastolic1 = document.getElementById('bp-left-diastolic1');
            const bpLeftSystolic2 = document.getElementById('bp-left-systolic2');
            const bpLeftDiastolic2 = document.getElementById('bp-left-diastolic2');
            const bpLeftAverage = document.getElementById('bp-left-average');

            function calculateLeftBPAverage() {
                calculateBPAverage(bpLeftSystolic1, bpLeftDiastolic1, bpLeftSystolic2, bpLeftDiastolic2, bpLeftAverage);
            }

            if (bpLeftSystolic1 && bpLeftDiastolic1 && bpLeftSystolic2 && bpLeftDiastolic2 && bpLeftAverage) {
                [bpLeftSystolic1, bpLeftDiastolic1, bpLeftSystolic2, bpLeftDiastolic2].forEach(input => {
                    ['input', 'change'].forEach(event => {
                        input.addEventListener(event, calculateLeftBPAverage);
                    });
                });
                calculateLeftBPAverage();
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
                "hypertension-guidelines": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Hypertension Diagnosis Guidelines</h3>
                        <p>Diagnosis of hypertension is based on:</p>
                        <ol style="padding-left: 25px;">
                            <li>Properly measured blood pressure on <strong>three</strong> separate occasions over 3-4 weeks</li>
                            <li>Average systolic BP ≥130 mmHg or diastolic BP ≥80 mmHg</li>
                            <li>Assessment of cardiovascular risk factors and target organ damage</li>
                        </ol>
                        <p style="margin-top: 15px;"><strong>Measurement protocol:</strong> No smoking or caffeine for 1 hour prior, empty bladder, 5 minutes resting, seated with back supported, feet on floor, legs uncrossed, arm supported at heart level, cuff on bare skin.</p>
                    </div>
                `,

                "lid-lag-info": `
                   <p><strong>Lid lag</strong> is a condition in which the upper eyelid is higher than normal while the eye is in downgaze. It can be measured by comparing the upper eyelid position in downgaze to its position in primary gaze relative to a fixed point like the pupil. The most common cause of lid lag is hyperthyroidism.</p>
                `,
                "hypertension-stages": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Hypertension Stage Classification</h3>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                            <tr style="background-color: var(--primary-color); color: white;">
                                <th style="padding: 10px; text-align: left;">Category</th>
                                <th style="padding: 10px; text-align: left;">Systolic BP (mmHg)</th>
                                <th style="padding: 10px; text-align: left;">Diastolic BP (mmHg)</th>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px;">Normal</td>
                                <td style="padding: 10px;">&lt;120</td>
                                <td style="padding: 10px;">&lt;80</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px;">Elevated</td>
                                <td style="padding: 10px;">120-129</td>
                                <td style="padding: 10px;">&lt;80</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px;">Stage 1 Hypertension</td>
                                <td style="padding: 10px;">130-139</td>
                                <td style="padding: 10px;">80-89</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px;">Stage 2 Hypertension</td>
                                <td style="padding: 10px;">≥140</td>
                                <td style="padding: 10px;">≥90</td>
                            </tr>
                        </table>
                        <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color); margin-top: 15px;">
                            <p><strong>Note:</strong> Based on 2017 ACC/AHA guidelines. Treatment goals may vary based on patient age and comorbidities.</p>
                        </div>
                    </div>
                `,
                "treatment-options": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Hypertension Treatment Options</h3>
                        <div style="margin-bottom: 20px;">
                            <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Initial treatment options:</h4>
                            <ol style="padding-left: 25px;">
                                <li><strong>Thiazide diuretics</strong> (e.g., Chlorthalidone 12.5 mg daily)</li>
                                <li><strong>Calcium channel blockers</strong> (e.g., Amlodipine 5 mg daily)</li>
                                <li><strong>ACE inhibitors</strong> (e.g., Lisinopril 5 mg daily)</li>
                                <li><strong>ARBs</strong> (e.g., Losartan 50 mg daily)</li>
                            </ol>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Special populations:</h4>
                            <ul style="padding-left: 25px;">
                                <li><strong>Diabetes:</strong> ACEI or ARB preferred</li>
                                <li><strong>Chronic kidney disease:</strong> ACEI or ARB preferred</li>
                                <li><strong>Elderly (≥60):</strong> Calcium channel blocker preferred for isolated systolic hypertension</li>
                            </ul>
                        </div>
                        <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color);">
                            <p><strong>Note:</strong> For most patients, goal BP is &lt;130/80 mmHg. Re-evaluate after 4-8 weeks of treatment.</p>
                        </div>
                    </div>
                `,
                "visual-acuity": `
        <h3 style="color: #1976d2; margin-top: 0; text-align: center; font-weight: bold; text-shadow: 1px 1px 3px rgba(25,118,210,0.2); animation: pulse 2s infinite;">
            Visual Acuity Testing
      </h3>
        <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
        <!-- Testing Procedure -->
        <div style="background: linear-gradient(to right, #e3f2fd, #bbdefb); padding: 15px; border-left: 5px solid #2196f3; margin-bottom: 15px; border-radius: 0 8px 8px 0; animation: fadeIn 1s;">
            <h4 style="color: #0d47a1; margin-top: 0; border-bottom: 2px dashed #64b5f6; padding-bottom: 5px;">Testing Procedure</h4>
            <ul style="margin-bottom: 0; color: #0d47a1; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Have patient stand at appropriate marking on floor, 20 feet away from the chart.</li>
                <li style="margin-bottom: 8px;">Have the patient cover one eye and read the lowest line they are able to read and record the Snellen notation.</li>
                <li>Test each eye independently.</li>
            </ul>
        </div>
        
        <!-- Snellen Chart -->
        <div style="background: linear-gradient(to right, #e1f5fe, #b3e5fc); padding: 15px; border-left: 5px solid #0288d1; border-radius: 0 8px 8px 0; animation: fadeIn 1.2s;">
            <h4 style="color: #01579b; margin-top: 0; border-bottom: 2px dashed #4fc3f7; padding-bottom: 5px;">Snellen Chart</h4>
            <div style="text-align: center; margin-top: 10px;">
                <img src="SNELLEN CHART.jpg" alt="Snellen Eye Chart" style="max-width: 100%; height: auto; border-radius: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <p style="margin-top: 8px; margin-bottom: 0; font-size: 0.9em; color: #01579b;">Standard Snellen chart for visual acuity testing</p>
            </div>
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
                "lifestyle-modifications": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Lifestyle Modifications for Hypertension</h3>
                        <p>Recommended lifestyle changes to reduce blood pressure:</p>
                        <ul style="padding-left: 25px;">
                            <li><strong>Weight loss</strong> if overweight or obese (goal BMI &lt;25)</li>
                            <li><strong>DASH diet</strong> (Dietary Approaches to Stop Hypertension)</li>
                            <li><strong>Reduced sodium intake</strong> (&lt;2.3 g/day, ideally &lt;1.5 g/day)</li>
                            <li><strong>Regular physical activity</strong> (≥150 min/week moderate-intensity)</li>
                            <li><strong>Moderate alcohol consumption</strong> (≤1 drink/day for women, ≤2 for men)</li>
                            <li><strong>Smoking cessation</strong></li>
                            <li><strong>Stress management</strong> techniques</li>
                        </ul>
                        <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color); margin-top: 15px;">
                            <p>Lifestyle changes can reduce systolic BP by 4-11 mmHg and may reduce medication requirements.</p>
                        </div>
                    </div>
                `,
                   "metabolic-syndrome": `
            <h3 style="color: #7b1fa2; margin-top: 0; text-align: center; font-weight: bold; text-shadow: 1px 1px 3px rgba(123,31,162,0.2); animation: pulse 2s infinite;">
              Metabolic Syndrome
            </h3>
          <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
              <div style="background: linear-gradient(to right, #f3e5f5, #e1bee7); padding: 15px; border-left: 5px solid #9c27b0; border-radius: 0 8px 8px 0; animation: fadeIn 1s;">
                <p style="margin-bottom: 0; color: #4a148c; font-weight: 500;">
                  Metabolic syndrome (also called insulin resistance syndrome) is characterized primarily by abdominal/visceral obesity (which is associated with increased insulin resistance); with waist circumference >85 cm in men, >80 cm in women for Asians, high triglycerides, and non-alcoholic fatty liver disease (NAFLD) (also called metabolic-dysfunction steatotic liver disease - MASLD). Usually associated with type 2 diabetes (=with hemoglobin A1c more than 6.5%) and often also with hypertension.
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
                "hypertensive-retinopathy": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Hypertensive Retinopathy Grading</h3>
                        <p>Classification of hypertensive retinopathy:</p>
                        <ol style="padding-left: 25px;">
                            <li><strong>Grade 1</strong>: Barely detectable arterial narrowing</li>
                            <li><strong>Grade 2</strong>: Obvious arterial narrowing with focal irregularities</li>
                            <li><strong>Grade 3</strong>: Grade 2 plus retinal hemorrhages, exudates, cotton-wool spots, or retinal edema</li>
                            <li><strong>Grade 4</strong>: Grade 3 plus papilledema</li>
                        </ol>
                        <div style="margin-top: 15px;">
                            <p><strong>Clinical significance:</strong></p>
                            <ul style="padding-left: 25px;">
                                <li>Grades 1-2 indicate mild-moderate hypertension</li>
                                <li>Grades 3-4 indicate severe hypertension and increased cardiovascular risk</li>
                                <li>Presence of retinopathy correlates with other target organ damage</li>
                            </ul>
                        </div>
                        <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color); margin-top: 15px;">
                            <p>Fundoscopic examination should be performed in all patients with newly diagnosed hypertension.</p>
                        </div>
                    </div>
                `,
                "patient-education": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Patient Education for Hypertension</h3>
                        <p>Key points to discuss with hypertensive patients:</p>
                        <ul style="padding-left: 25px;">
                            <li>Explanation of hypertension as a chronic, usually asymptomatic condition</li>
                            <li>Importance of regular blood pressure monitoring</li>
                            <li>Medication adherence even when feeling well</li>
                            <li>Potential complications of uncontrolled hypertension:
                                <ul style="padding-left: 20px; margin-top: 5px;">
                                    <li>Stroke</li>
                                    <li>Heart attack</li>
                                    <li>Heart failure</li>
                                    <li>Kidney disease</li>
                                    <li>Vision loss</li>
                                </ul>
                            </li>
                            <li>Warning signs requiring immediate medical attention:
                                <ul style="padding-left: 20px; margin-top: 5px;">
                                    <li>Severe headache</li>
                                    <li>Chest pain</li>
                                    <li>Shortness of breath</li>
                                    <li>Visual changes</li>
                                    <li>Severe anxiety/confusion</li>
                                </ul>
                            </li>
                        </ul>
                        <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color); margin-top: 15px;">
                            <p><strong>Note:</strong> Use visual aids (posters, pictures of retinopathy) to enhance understanding. Provide written materials for reference.</p>
                        </div>
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