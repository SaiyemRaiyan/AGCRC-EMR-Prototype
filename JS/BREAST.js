        document.addEventListener('DOMContentLoaded', function() {
            // Set current date
            const today = new Date();
            const visitDateInput = document.getElementById('visit-date');
            const examDateInput = document.getElementById('exam-date');
            if (visitDateInput) visitDateInput.valueAsDate = today;
            if (examDateInput) examDateInput.valueAsDate = today;

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
            toggleDisplay('input[name="menstrual-periods"]', 'menstrual-details', 'yes');
            toggleDisplay('input[name="menstrual-periods"]', 'postmenopausal', 'no');
            toggleDisplay('input[name="previous-diagnosis"]', 'previous-diagnosis-details', 'yes');
            toggleDisplay('input[name="previous-diagnosis"]', 'new-problem-details', 'no');
            toggleDisplay('#previous-diagnosis', 'breast-cancer-details', function() {
                return document.getElementById('previous-diagnosis').value.toLowerCase().includes('cancer');
            });
            toggleDisplay('input[name="medical-records"]', 'medical-records-details', 'yes');
            toggleDisplay('input[name="symptoms"][value="pain"]', 'pain-details');
            toggleDisplay('input[name="symptoms"][value="lump"]', 'lump-details');
            toggleDisplay('input[name="symptoms"][value="skin-changes"]', 'skin-changes-details');
            toggleDisplay('input[name="symptoms"][value="underarm"]', 'underarm-details');
            toggleDisplay('input[name="menstrual-pain"]', 'premenstrual-pain', 'yes');
            toggleDisplay('input[name="breast-injury"]', 'injury-details', 'yes');
            toggleDisplay('input[name="cervical-nodes"]', 'cervical-nodes-details', 'yes');
            toggleDisplay('input[name="infraclavicular-nodes"]', 'infraclavicular-nodes-details', 'yes');
            toggleDisplay('input[name="left-axilla"]', 'left-axilla-details', 'yes');
            toggleDisplay('input[name="right-axilla"]', 'right-axilla-details', 'yes');
            toggleDisplay('input[name="left-axilla-nodes"]', 'left-axilla-nodes-details', 'yes');
            toggleDisplay('input[name="right-axilla-nodes"]', 'right-axilla-nodes-details', 'yes');
            toggleDisplay('input[name="right-calcifications"]', 'right-calcifications-details', 'yes');
            toggleDisplay('input[name="left-calcifications"]', 'left-calcifications-details', 'yes');
            toggleDisplay('input[name="murmurs-present"]', 'murmurs-present-details', 'present');
            toggleDisplay('input[name="right-lung"]', 'right-lung-details', 'abnormal');
            toggleDisplay('input[name="left-lung"]', 'left-lung-details', 'abnormal');
            toggleDisplay('input[name="further-tests"]', 'specific-tests', 'specific');
            toggleDisplay('input[name="teleconsult"]', 'teleconsult-details', 'yes');
            toggleDisplay('input[name="other-test"]', 'other-test-details');

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
                "breast-guidelines": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Breast Problem Diagnosis Guidelines</h3>
                        <p>Diagnosis of breast problems is typically based on:</p>
                        <ol style="padding-left: 25px;">
                            <li>Characteristic symptoms (pain, lump, nipple changes)</li>
                            <li>Physical examination findings</li>
                            <li>Ultrasound imaging</li>
                            <li>Biopsy when malignancy is suspected</li>
                        </ol>
                        <p style="margin-top: 15px;"><strong>Common benign conditions:</strong> Fibrocystic changes, fibroadenomas, mastitis</p>
                        <p><strong>Malignant conditions:</strong> Breast cancer (various types)</p>
                    </div>
                `,
                "red-flags": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--danger-color); margin-bottom: 15px;">Breast Problem Red Flags</h3>
                        <p>Warning signs that suggest complications or malignancy:</p>
                        <ul style="padding-left: 25px;">
                            <li>Rapid onset of inflammatory signs → abscess, infection, inflammatory breast cancer</li>
                            <li>Chronic, growing, irregular bordered, unilateral breast mass</li>
                            <li>Skin changes (dimpling, redness, peau d'orange)</li>
                            <li>Nipple discharge which is unilateral and bloody or sero-sanguineous</li>
                            <li>Palpable axillary lymph nodes</li>
                        </ul>
                        <div style="background-color: #ffeeee; padding: 15px; border-left: 3px solid var(--danger-color); margin-top: 15px;">
                            <p style="font-weight: bold; margin-bottom: 0;">Patients with red flags should be referred for further evaluation to rule out serious conditions like breast cancer.</p>
                        </div>
                    </div>
                `,
                "treatment-options": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Breast Problem Treatment Options</h3>
                        <div style="margin-bottom: 20px;">
                            <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Benign conditions:</h4>
                            <ul style="padding-left: 25px;">
                                <li><strong>Fibrocystic changes:</strong> Pain management, dietary modifications</li>
                                <li><strong>Fibroadenomas:</strong> Monitoring or surgical excision</li>
                                <li><strong>Mastitis:</strong> Antibiotics, warm compresses</li>
                            </ul>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Malignant conditions:</h4>
                            <ul style="padding-left: 25px;">
                                <li>Surgery (lumpectomy, mastectomy)</li>
                                <li>Radiation therapy</li>
                                <li>Chemotherapy</li>
                                <li>Hormone therapy for hormone receptor-positive cancers</li>
                                <li>Targeted therapy for HER2-positive cancers</li>
                            </ul>
                        </div>
                    </div>
                `,
                "lifestyle-modifications": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Lifestyle Modifications for Breast Problems</h3>
                        <p>Recommended lifestyle changes to reduce breast pain and discomfort:</p>
                        <ul style="padding-left: 25px;">
                            <li><strong>Supportive bra</strong> especially during physical activity</li>
                            <li><strong>Reduce caffeine intake</strong> if fibrocystic changes are present</li>
                            <li><strong>Evening primrose oil</strong> may help with cyclic mastalgia</li>
                            <li><strong>Maintain healthy weight</strong> to reduce hormonal influences</li>
                            <li><strong>Regular exercise</strong> to improve overall health</li>
                            <li><strong>Limit alcohol consumption</strong> to reduce breast cancer risk</li>
                        </ul>
                    </div>
                `,
                "breast-exam": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Breast Examination</h3>
                        <p>Key components of breast examination:</p>
                        <ol style="padding-left: 25px;">
                            <li><strong>Inspection:</strong> Look for asymmetry, skin changes, nipple retraction</li>
                            <li><strong>Palpation:</strong> Systematic examination of all quadrants using finger pads</li>
                            <li><strong>Nipple examination:</strong> Check for discharge, inversion</li>
                            <li><strong>Axillary examination:</strong> Palpate for lymphadenopathy</li>
                        </ol>
                        <div style="margin-top: 15px;">
                            <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Special considerations:</h4>
                            <ul style="padding-left: 25px;">
                                <li>Compare both breasts for symmetry</li>
                                <li>Note any dominant masses and their characteristics</li>
                                <li>Document location using clock face notation</li>
                            </ul>
                        </div>
                    </div>
                `,
                "patient-education": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Patient Education for Breast Problems</h3>
                        <p>Key points to discuss with patients:</p>
                        <ul style="padding-left: 25px;">
                            <li>Breast self-awareness and regular self-exams</li>
                            <li>Importance of clinical breast exams</li>
                            <li>When to seek medical attention for new changes</li>
                            <li>Understanding benign vs. malignant conditions</li>
                            <li>Follow-up recommendations based on findings</li>
                        </ul>
                    </div>
                `,
                "reference": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Reference Article</h3>
                        <p><strong>Nahar, N., Woods, J.H., Akhter, C., Hossain, S.M., and Love, R.R.: Point-of-care high resolution ultrasound in the evaluation of 1085 consecutive Bangladeshi women presenting to a breast problem clinic. Bangladesh Medical Journal 2016. 49 (1+2): 3-7.</strong></p>
                        <p>Key points from this reference:</p>
                        <ul style="padding-left: 25px;">
                            <li>Epidemiology of breast problems in Bangladeshi women</li>
                            <li>Diagnostic approach using point-of-care ultrasound</li>
                            <li>Clinical characteristics of common breast conditions</li>
                        </ul>
                    </div>
                `,
                "recommendations": `
                    <div style="font-size: 22px; line-height: 1.6;">
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Recommended Medical Interventions</h3>
                        <ul style="padding-left: 25px; list-style-type: none;">
                            <li style="margin-bottom: 10px;">
                                <strong>Pain management:</strong> Acetaminophen or NSAIDs for mild-moderate pain
                            </li>
                            <li style="margin-bottom: 10px;">
                                <strong>Antibiotics:</strong> For bacterial mastitis (dicloxacillin or cephalexin)
                            </li>
                            <li style="margin-bottom: 10px;">
                                <strong>Hormonal therapy:</strong> For severe cyclic mastalgia (tamoxifen or danazol)
                            </li>
                            <li style="margin-bottom: 10px;">
                                <strong>Surgical referral:</strong> For growing or suspicious masses
                            </li>
                            <li style="margin-bottom: 10px;">
                                <strong>Oncology referral:</strong> For confirmed or highly suspected malignancy
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

            // Special toggle for menstrual pain relation
            const menstrualPeriodsInput = document.querySelector('input[name="menstrual-periods"][value="yes"]');
            if (menstrualPeriodsInput) {
                menstrualPeriodsInput.addEventListener('change', function() {
                    const painDetails = document.getElementById('pain-details');
                    const menstrualPain = document.getElementById('menstrual-pain');
                    if (this.checked && painDetails.style.display === 'block') {
                        menstrualPain.style.display = 'block';
                    } else {
                        menstrualPain.style.display = 'none';
                    }
                });
            }
        });