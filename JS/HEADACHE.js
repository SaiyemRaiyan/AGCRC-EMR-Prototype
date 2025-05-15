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
            toggleDisplay('input[name="fundoscopy-done"]', 'fundoscopy-details', 'yes');
            toggleDisplay('input[name="murmurs-present"]', 'murmurs-present-details', 'present');
            toggleDisplay('input[name="right-lung"]', 'right-lung-details', 'abnormal');
            toggleDisplay('input[name="left-lung"]', 'left-lung-details', 'abnormal');
            toggleDisplay('input[name="further-tests"]', 'specific-tests', 'specific');
            toggleDisplay('input[name="teleconsult"]', 'teleconsult-details', 'yes');
            toggleDisplay('input[name="dx-other"]', 'other-dx-details', true);
            
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
                "tension-headache": `
                    <h3 style="color: var(--primary-color); margin-top: 0;">Tension Headache</h3>
                    <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
                        <p><strong>Characteristics:</strong> Most common type of headache. Slow onset with tightening/squeezing sensation around the entire head or bilateral in frontotemporal, occipito-cervical regions.</p>
                        <p><strong>Common triggers:</strong> Hunger, sleep deprivation, dehydration, stress, poor posture, eye strain.</p>
                        <p><strong>Typical duration:</strong> 30 minutes to several days.</p>
                        <p><strong>Treatment:</strong> Over-the-counter pain relievers (acetaminophen, ibuprofen), stress management, relaxation techniques, improved posture.</p>
                    </div>
                `,
                "cluster-headache": `
                    <h3 style="color: var(--primary-color); margin-top: 0;">Cluster Headache</h3>
                    <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
                        <p><strong>Characteristics:</strong> Infrequent but extremely painful headaches that occur in cyclical patterns or clusters. More common in men. Burning or stabbing pain around one eye, often with tearing and nasal congestion on the affected side.</p>
                        <p><strong>Duration:</strong> Typically 15 minutes to 3 hours, occurring once every other day up to 8 times per day during a cluster period.</p>
                        <p><strong>Treatment:</strong> Oxygen therapy, triptans, local anesthetics, preventive medications like verapamil.</p>
                    </div>
                `,
                "migraine-headache": `
                    <h3 style="color: var(--primary-color); margin-top: 0;">Migraine Headache</h3>
                    <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
                        <p><strong>Characteristics:</strong> Recurrent headaches occurring at intervals. Throbbing pain, often unilateral (commonly frontotemporal). Nausea, vomiting, light and sound sensitivity. More common in women and during ages 30-40.</p>
                        <p><strong>Aura:</strong> Some migraines are preceded by aura lasting 5-60 minutes with visual disturbances (flashing lights, zigzag patterns) or sensory symptoms.</p>
                        <p><strong>Triggers:</strong> Hormonal changes, certain foods, stress, sensory stimuli, sleep changes, physical factors, weather changes, medications.</p>
                        <p><strong>Treatment:</strong> Triptans, NSAIDs, anti-nausea medications, preventive medications (beta-blockers, anticonvulsants, antidepressants).</p>
                    </div>
                `,
                "post-traumatic-headache": `
                    <h3 style="color: var(--primary-color); margin-top: 0;">Post Traumatic Headache</h3>
                    <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
                        <p><strong>Characteristics:</strong> Headache that develops within 7 days after trauma or injury to the head or after regaining consciousness following the trauma.</p>
                        <p><strong>Types:</strong> May resemble tension-type headache or migraine. Can be acute (resolving within 3 months) or chronic (persisting longer).</p>
                        <p><strong>Associated symptoms:</strong> Dizziness, insomnia, difficulty concentrating, memory problems, irritability, fatigue.</p>
                        <p><strong>Treatment:</strong> Similar to primary headache disorders (analgesics, triptans), plus management of underlying post-concussion symptoms.</p>
                    </div>
                `,
                "cardiac-auscultation": `
                    <h3 style="color: var(--primary-color); margin-top: 0;">A PRIMER ON CARDIAC AUSCULTATION</h3>
                    <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
                        <p><strong>First heart sound (S1):</strong> Closure of atrial-ventricular valves - tricuspid (right heart) and mitral (left heart) valves. Best heard at apex.</p>
                        <p><strong>Systole:</strong> The period between S1 and S2 when the heart muscles are contracting.</p>
                        <p><strong>Second heart sound (S2):</strong> Aortic and pulmonic valve (also called semi-lunar valves) closure, usually in this order. Best heard in the cephalad right (A2) and left (P2) rib interspaces.</p>
                        <p><strong>Split S2:</strong> Normal with inspiration associated with increased filling of right ventricle = A2 followed by delayed P2.</p>
                        <p><strong>Third heart sound (S3):</strong> A physiologically normal ventricular filling sound in young people and with exercise best heard at apex.</p>
                        <p><strong>Diastole:</strong> The period between S2 and S1 when the heart muscles are at rest.</p>
                        <p><strong>Atrial-ventricular valves:</strong> Open silently in diastole.</p>
                        <p><strong>Murmurs:</strong> The significance of murmurs is determined by their locations, character, timing, and intensities. Systolic murmurs are often innocent or not indicative of heart disease, while diastolic murmurs are almost always pathologic.</p>
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
                "headache-guidelines": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Headache Diagnosis Guidelines</h3>
                        <p>Diagnosis of headache is typically based on:</p>
                        <ol style="padding-left: 25px;">
                            <li>Detailed history including characteristics, duration, frequency, and associated symptoms</li>
                            <li>Physical examination focusing on neurological assessment</li>
                            <li>Identification of red flags that may indicate secondary causes</li>
                            <li>Response to initial treatment</li>
                            <li>Imaging (CT/MRI) when secondary causes are suspected</li>
                        </ol>
                        <p style="margin-top: 15px;"><strong>Primary headaches:</strong> Migraine, tension-type, cluster</p>
                        <p><strong>Secondary headaches:</strong> Trauma, vascular disorders, substance use/withdrawal, infection, etc.</p>
                    </div>
                `,
                "red-flags": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--danger-color); margin-bottom: 15px;">Headache Red Flags</h3>
                        <p>Warning signs that suggest serious underlying conditions:</p>
                        <ul style="padding-left: 25px;">
                            <li>Sudden, severe headache ("thunderclap headache")</li>
                            <li>New headache in patient >50 years old</li>
                            <li>Change in pattern of chronic headaches</li>
                            <li>Headache worsening over days or weeks</li>
                            <li>Headache triggered by cough, exertion, or Valsalva maneuver</li>
                            <li>Associated fever, neck stiffness, rash</li>
                            <li>Focal neurological signs or symptoms</li>
                            <li>Papilledema</li>
                            <li>History of cancer or HIV</li>
                        </ul>
                        <div style="background-color: #ffeeee; padding: 15px; border-left: 3px solid var(--danger-color); margin-top: 15px;">
                            <p style="font-weight: bold; margin-bottom: 0;">Patients with red flags should be referred for urgent evaluation and possible imaging to rule out serious conditions like subarachnoid hemorrhage, meningitis, or brain tumor.</p>
                        </div>
                    </div>
                `,
                "treatment-options": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Headache Treatment Options</h3>
                        <div style="margin-bottom: 20px;">
                            <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Acute treatment:</h4>
                            <ul style="padding-left: 25px;">
                                <li><strong>Tension-type:</strong> NSAIDs, acetaminophen</li>
                                <li><strong>Migraine:</strong> Triptans, NSAIDs, antiemetics</li>
                                <li><strong>Cluster:</strong> Oxygen therapy, triptans</li>
                            </ul>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Preventive treatment:</h4>
                            <ul style="padding-left: 25px;">
                                <li><strong>Migraine:</strong> Beta-blockers, anticonvulsants, antidepressants, CGRP inhibitors</li>
                                <li><strong>Cluster:</strong> Verapamil, lithium, corticosteroids</li>
                                <li><strong>Tension-type:</strong> Tricyclic antidepressants</li>
                            </ul>
                        </div>
                        <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color);">
                            <p><strong>Note:</strong> Medication overuse can lead to rebound headaches. Limit acute medications to ≤2 days/week.</p>
                        </div>
                    </div>
                `,
                "lifestyle-modifications": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Lifestyle Modifications for Headaches</h3>
                        <p>Recommended lifestyle changes to reduce headache frequency and severity:</p>
                        <ul style="padding-left: 25px;">
                            <li><strong>Regular sleep schedule</strong> with consistent bedtimes and wake times</li>
                            <li><strong>Hydration:</strong> Drink adequate water throughout the day</li>
                            <li><strong>Regular meals:</strong> Avoid skipping meals</li>
                            <li><strong>Stress management:</strong> Relaxation techniques, meditation, biofeedback</li>
                            <li><strong>Regular exercise:</strong> Moderate aerobic activity most days</li>
                            <li><strong>Posture improvement:</strong> Especially for tension-type headaches</li>
                            <li>Avoid known dietary triggers:
                                <ul style="padding-left: 20px; margin-top: 5px;">
                                    <li>Alcohol (especially red wine)</li>
                                    <li>Caffeine (or caffeine withdrawal)</li>
                                    <li>Aged cheeses</li>
                                    <li>Processed meats with nitrates</li>
                                    <li>MSG</li>
                                    <li>Artificial sweeteners</li>
                                </ul>
                            </li>
                        </ul>
                        <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color); margin-top: 15px;">
                            <p>While lifestyle changes alone may not eliminate headaches, they can reduce frequency and severity, and improve response to medications.</p>
                        </div>
                    </div>
                `,
                "neuro-exam": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Neurological Examination for Headaches</h3>
                        <p>Key components of neurological examination in headache patients:</p>
                        <ol style="padding-left: 25px;">
                            <li><strong>Mental status:</strong> Level of consciousness, orientation, memory</li>
                            <li><strong>Cranial nerves:</strong> Complete assessment of all 12 cranial nerves</li>
                            <li><strong>Motor function:</strong> Strength, tone, coordination</li>
                            <li><strong>Sensory function:</strong> Light touch, pinprick, vibration, proprioception</li>
                            <li><strong>Reflexes:</strong> Deep tendon reflexes, plantar responses</li>
                            <li><strong>Gait and balance:</strong> Observe walking, tandem gait, Romberg test</li>
                        </ol>
                        <div style="margin-top: 15px;">
                            <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Special considerations:</h4>
                            <ul style="padding-left: 25px;">
                                <li>Focal neurological deficits suggest secondary headache</li>
                                <li>Papilledema suggests increased intracranial pressure</li>
                                <li>Meningeal signs (neck stiffness) suggest meningitis or subarachnoid hemorrhage</li>
                            </ul>
                        </div>
                    </div>
                `,
                "patient-education": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Patient Education for Headaches</h3>
                        <p>Key points to discuss with headache patients:</p>
                        <ul style="padding-left: 25px;">
                            <li>Explanation of headache type and its chronic nature</li>
                            <li>Importance of identifying and avoiding triggers</li>
                            <li>Proper use of medications (acute vs preventive)</li>
                            <li>Warning signs requiring immediate medical attention:
                                <ul style="padding-left: 20px; margin-top: 5px;">
                                    <li>Worst headache of life</li>
                                    <li>Sudden onset severe headache</li>
                                    <li>Headache with fever, stiff neck, rash</li>
                                    <li>Headache with confusion, seizures, or focal neurological symptoms</li>
                                    <li>Headache after head trauma</li>
                                </ul>
                            </li>
                            <li>Importance of follow-up for symptom monitoring</li>
                            <li>Resources for additional information (www.headaches.org)</li>
                        </ul>
                        <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid var(--primary-color); margin-top: 15px;">
                            <p><strong>Note:</strong> Patient education improves adherence to therapy and helps identify complications early.</p>
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
                "reference": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Reference Articles</h3>
                        <p><strong>Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018 Jan;38(1):1-211.</strong></p>
                        <p>Key points from this reference:</p>
                        <ul style="padding-left: 25px;">
                            <li>Comprehensive classification system for all headache disorders</li>
                            <li>Diagnostic criteria for primary and secondary headaches</li>
                            <li>Evidence-based approach to headache diagnosis</li>
                            <li>Standardized terminology for clinical and research use</li>
                        </ul>
                        <p style="margin-top: 15px;">DOI: <a href="https://doi.org/10.1177/0333102417738202" target="_blank">10.1177/0333102417738202</a></p>
                    </div>
                `,
                "recommendations": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Recommended Medical Interventions</h3>
                        <ul style="padding-left: 25px; list-style-type: none;">
                            <li style="margin-bottom: 10px;">
                                <strong>Acute treatment for mild-moderate headaches</strong>
                                <div style="margin-left: 20px; margin-top: 5px;">
                                    Acetaminophen 500-1000 mg every 6 hours as needed<br>
                                    Ibuprofen 200-400 mg every 6-8 hours as needed<br>
                                    <small>Limit to ≤2 days/week to prevent medication overuse headache</small>
                                </div>
                            </li>
                            <li style="margin-bottom: 10px;">
                                <strong>Acute treatment for moderate-severe migraines</strong>
                                <div style="margin-left: 20px; margin-top: 5px;">
                                    Sumatriptan 50-100 mg orally at onset<br>
                                    Rizatriptan 10 mg orally at onset<br>
                                    <small>Contraindicated in cardiovascular disease</small>
                                </div>
                            </li>
                            <li style="margin-bottom: 10px;">
                                <strong>Preventive treatment for frequent headaches</strong>
                                <div style="margin-left: 20px; margin-top: 5px;">
                                    Propranolol 40-160 mg daily<br>
                                    Amitriptyline 10-75 mg at bedtime<br>
                                    Topiramate 25-100 mg daily<br>
                                    <small>Choose based on comorbidities and side effect profile</small>
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

            // Pupils dilated emergency alert
            const pupilRadios = document.querySelectorAll('input[name="pupils-dilated"]');
            const medicalAlert = document.getElementById('medical-emergency-alert');

        pupilRadios.forEach(radio => {
             radio.addEventListener('change', function() {
             medicalAlert.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    
            // Initialize if yes is already selected
            if (radio.checked && radio.value === 'yes') {
                 medicalAlert.style.display = 'block';
            }
     });
            
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