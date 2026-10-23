const products = {
    proteins: {
        'turkey_breast': { name: 'Индейка (грудка)', kcal: 110, p: 23, f: 2, c: 0 },
        'turkey_thigh': { name: 'Индейка (бедро)', kcal: 140, p: 21, f: 6, c: 0 },
        'turkey_tenderloin': { name: 'Индейка (малое филе)', kcal: 110, p: 23, f: 2, c: 0 },
        'turkey_indilight_thigh': { name: 'Индейка Индилайт (филе бедра)', kcal: 113, p: 19.5, f: 4, c: 0 },
        'turkey_indilight_tenderloin': { name: 'Индейка Индилайт (малое филе)', kcal: 110, p: 23, f: 2, c: 0 },
        'turkey_indilight_breast': { name: 'Индейка Индилайт (филе грудки)', kcal: 110, p: 23, f: 2, c: 0 },
        'duck_breast': { name: 'Утка (грудка)', kcal: 140, p: 20, f: 7, c: 0 },
        'duck_thigh': { name: 'Утка (бедро)', kcal: 160, p: 19, f: 9, c: 0 },
        'beef_tenderloin': { name: 'Говядина (вырезка)', kcal: 120, p: 20, f: 3, c: 0 },
        'beef_shoulder': { name: 'Говядина (лопатка)', kcal: 250, p: 18, f: 20, c: 0 },
        'beef_shank': { name: 'Говядина (голяшка)', kcal: 190, p: 20, f: 11, c: 0 },
        'rabbit': { name: 'Кролик', kcal: 150, p: 21, f: 7, c: 0 },
        'lamb_lean': { name: 'Баранина', kcal: 210, p: 19, f: 14, c: 0 },
        'salmon_murmansk': { name: 'Семга (Мурманская)', kcal: 205, p: 20, f: 13.5, c: 0 },
        'salmon_generic': { name: 'Лосось', kcal: 210, p: 20, f: 14, c: 0 },
        'sockeye': { name: 'Нерка', kcal: 160, p: 22, f: 8, c: 0 },
        'trout': { name: 'Форель', kcal: 140, p: 21, f: 6, c: 0 },
        'cod': { name: 'Треска', kcal: 80, p: 17, f: 1, c: 0 },
        'hake': { name: 'Хек', kcal: 85, p: 17, f: 1, c: 0 },
        'pollock': { name: 'Минтай', kcal: 75, p: 16, f: 1, c: 0 },
        'sea_bass': { name: 'Морской окунь', kcal: 90, p: 18, f: 2, c: 0 }
    },
    mainVeggies: {
        'broccoli_fresh': { name: 'Брокколи (свеж.)', kcal: 34, p: 2.8, f: 0.4, c: 7 },
        'broccoli_frozen': { name: 'Брокколи (замор.)', kcal: 23, p: 2.0, f: 0.3, c: 5 },
        'cauliflower_fresh': { name: 'Цветная (свеж.)', kcal: 30, p: 2.5, f: 0.3, c: 5 },
        'cauliflower_frozen': { name: 'Цветная (замор.)', kcal: 20, p: 1.8, f: 0.2, c: 4 },
        'pumpkin': { name: 'Тыква', kcal: 26, p: 1, f: 0.1, c: 7 },
        'sweet_potato': { name: 'Батат', kcal: 86, p: 1.6, f: 0.1, c: 20 }
    },
    extraVeggies: {
        'zucchini': { name: 'Цуккини', kcal: 20, p: 1.2, f: 0.3, c: 3.1 },
        'zucchini_regular': { name: 'Кабачки', kcal: 24, p: 0.6, f: 0.1, c: 4 },
        'carrot': { name: 'Морковь', kcal: 41, p: 0.9, f: 0.2, c: 9 },
        'paprika': { name: 'Перец', kcal: 31, p: 1, f: 0.3, c: 6 },
        'pepper_ramiro': { name: 'Перец Рамиро', kcal: 28, p: 1, f: 0.3, c: 5.5 },
        'apple': { name: 'Яблоко', kcal: 52, p: 0.3, f: 0.2, c: 14 },
        'cranberry_fresh': { name: 'Брусника (свеж.)', kcal: 43, p: 0.7, f: 0.5, c: 8 },
        'cranberry_frozen': { name: 'Брусника (замор.)', kcal: 38, p: 0.6, f: 0.4, c: 7 },
        'raspberry_fresh': { name: 'Малина (свеж.)', kcal: 46, p: 1.2, f: 0.7, c: 12 },
        'raspberry_frozen': { name: 'Малина (замор.)', kcal: 40, p: 1.0, f: 0.6, c: 10 },
        'wakame': { name: 'Вакаме', kcal: 300, p: 10, f: 1, c: 50, max_g: 5 }
    },
    cottageCheese: {
        'cottage_0': { name: 'Творог Простоквашино 0%', kcal: 76, p: 18, f: 0, c: 1.5 },
        'cottage_5': { name: 'Творог Простоквашино 5%', kcal: 121, p: 17, f: 5, c: 1.5 },
        'cottage_9': { name: 'Творог Простоквашино 9%', kcal: 159, p: 16, f: 9, c: 2 }
    }
};

let customKBju = { protein: null, protein2: null, veg1: null, veg2: null, veg3: null };
let cottageCheeseRecommendation = null;
let calculatedRecipe = null;
let activeRecipeIndex = null;

const emojiMap = {
    'turkey_breast': '🦃', 'turkey_thigh': '🦃', 'turkey_tenderloin': '🦃',
    'turkey_indilight_thigh': '🦃', 'turkey_indilight_tenderloin': '🦃', 'turkey_indilight_breast': '🦃',
    'duck_breast': '🦆', 'duck_thigh': '🦆',
    'beef_tenderloin': '🥩', 'beef_shoulder': '🥩', 'beef_shank': '🥩',
    'rabbit': '🐰', 'lamb_lean': '🐑',
    'salmon_murmansk': '🐟', 'salmon_generic': '🐟', 'sockeye': '🐟', 'trout': '🐟',
    'cod': '🐠', 'hake': '🐠', 'pollock': '🐠', 'sea_bass': '🐠',
    'broccoli_fresh': '🥦', 'broccoli_frozen': '🥦', 'cauliflower_fresh': '🤍', 'cauliflower_frozen': '🤍',
    'pumpkin': '🎃', 'sweet_potato': '🍠',
    'zucchini': '🥒', 'zucchini_regular': '🥒', 'carrot': '🥕', 'paprika': '🫑', 'pepper_ramiro': '🌶️',
    'apple': '🍎', 'cranberry_fresh': '🔴', 'cranberry_frozen': '🫐', 'raspberry_fresh': '🍓', 'raspberry_frozen': '🍓',
    'wakame': '🌿'
};

function getEmoji(productKey) {
    if (!productKey) return '';
    return emojiMap[productKey] || '🍽️';
}

function populateSelects() {
    const proteinSelect = document.getElementById('select-protein');
    const protein2Select = document.getElementById('select-protein2');
    Object.entries(products.proteins).forEach(([key, val]) => {
        proteinSelect.add(new Option(val.name, key));
        protein2Select.add(new Option(val.name, key));
    });

    const mainVegSelect = document.getElementById('select-veg1');
    Object.entries(products.mainVeggies).forEach(([key, val]) => {
        mainVegSelect.add(new Option(val.name, key));
    });

    const extraVegGroups = {
        'vegetables': ['zucchini', 'zucchini_regular', 'carrot', 'paprika', 'pepper_ramiro'],
        'fruits': ['apple'],
        'berries': ['cranberry_fresh', 'cranberry_frozen', 'raspberry_fresh', 'raspberry_frozen'],
        'seaweed': ['wakame']
    };

    ['select-veg2', 'select-veg3'].forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        const groupNames = { 'vegetables': 'Овощи', 'fruits': 'Фрукты', 'berries': 'Ягоды', 'seaweed': 'Водоросли' };
        Object.entries(extraVegGroups).forEach(([group, keys]) => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = groupNames[group];
            keys.forEach(key => {
                const option = new Option(products.extraVeggies[key].name, key);
                optgroup.appendChild(option);
            });
            select.appendChild(optgroup);
        });
    });
}

function getProductData(type, key) {
    if (type === 'protein' || type === 'protein2') return products.proteins[key];
    if (type === 'veg1') return products.mainVeggies[key];
    if (type === 'veg2' || type === 'veg3') return products.extraVeggies[key];
    if (type === 'cottage') return products.cottageCheese[key];
    return null;
}

function updateKbjuFields(type) {
    const select = document.getElementById(`select-${type}`);
    const key = select.value;
    const line = select.closest('.ingredient-line');

    if (!key) {
        ['kcal', 'p', 'f', 'c'].forEach(f => document.getElementById(`${type}-${f}`).value = '');
        if (line) line.classList.remove('modified');
        return;
    }

    const product = getProductData(type, key);
    const data = customKBju[type] || product;

    document.getElementById(`${type}-kcal`).value = data.kcal;
    document.getElementById(`${type}-p`).value = data.p;
    document.getElementById(`${type}-f`).value = data.f;
    document.getElementById(`${type}-c`).value = data.c;

    if (line) customKBju[type] ? line.classList.add('modified') : line.classList.remove('modified');
}

function checkAllSelected() {
    const p1 = document.getElementById('select-protein').value;
    const v1 = document.getElementById('select-veg1').value;
    const v2 = document.getElementById('select-veg2').value;
    const v3 = document.getElementById('select-veg3').value;
    if (p1 && v1 && v2 && v3) autoCalculateWeights();
}

['protein', 'protein2', 'veg1', 'veg2', 'veg3'].forEach(type => {
    document.getElementById(`select-${type}`).addEventListener('change', () => {
        customKBju[type] = null;
        updateKbjuFields(type);
        if (type === 'protein2') {
            const isDisabled = !document.getElementById('select-protein2').value;
            ['p', 'f', 'c', 'kcal'].forEach(f => {
                document.getElementById(`${type}-${f}`).disabled = isDisabled;
            });
        }
        checkAllSelected();
    });
});

['target-kcal-min', 'target-kcal-max', 'target-protein-min', 'target-protein-max', 'target-fat-min', 'target-fat-max'].forEach(id => {
    document.getElementById(id).addEventListener('change', checkAllSelected);
});

document.querySelectorAll('.btn-reset').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.target;
        customKBju[type] = null;
        updateKbjuFields(type);
        localStorage.setItem('dogfood_custom_kbju', JSON.stringify(customKBju));
        checkAllSelected();
    });
});

['protein', 'protein2', 'veg1', 'veg2', 'veg3'].forEach(type => {
    ['p', 'f', 'c'].forEach(field => {
        const input = document.getElementById(`${type}-${field}`);
        if (!input) return;
        input.addEventListener('input', () => {
            const select = document.getElementById(`select-${type}`);
            if (!select.value) return;
            const p = parseFloat(document.getElementById(`${type}-p`).value) || 0;
            const f = parseFloat(document.getElementById(`${type}-f`).value) || 0;
            const c = parseFloat(document.getElementById(`${type}-c`).value) || 0;
            document.getElementById(`${type}-kcal`).value = (p * 4 + f * 9 + c * 4).toFixed(0);
            customKBju[type] = { kcal: p * 4 + f * 9 + c * 4, p, f, c };
            select.closest('.ingredient-line').classList.add('modified');
            localStorage.setItem('dogfood_custom_kbju', JSON.stringify(customKBju));
            checkAllSelected();
        });
    });
});

function loadSavedData() {
    const saved = localStorage.getItem('dogfood_targets');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('target-kcal-min').value = data.kcalMin || '';
        document.getElementById('target-kcal-max').value = data.kcalMax || '';
        document.getElementById('target-protein-min').value = data.proteinMin || '';
        document.getElementById('target-protein-max').value = data.proteinMax || '';
        document.getElementById('target-fat-min').value = data.fatMin || '';
        document.getElementById('target-fat-max').value = data.fatMax || '';
    }
    const savedCustom = localStorage.getItem('dogfood_custom_kbju');
    if (savedCustom) Object.assign(customKBju, JSON.parse(savedCustom));
    
    ['protein', 'protein2', 'veg1', 'veg2', 'veg3'].forEach(type => {
        const select = document.getElementById(`select-${type}`);
        if (select && select.value) updateKbjuFields(type);
    });
    
    loadRecipesList();
    checkAllSelected();
}

document.getElementById('save-targets').addEventListener('click', () => {
    const data = {
        kcalMin: document.getElementById('target-kcal-min').value,
        kcalMax: document.getElementById('target-kcal-max').value,
        proteinMin: document.getElementById('target-protein-min').value,
        proteinMax: document.getElementById('target-protein-max').value,
        fatMin: document.getElementById('target-fat-min').value,
        fatMax: document.getElementById('target-fat-max').value
    };
    localStorage.setItem('dogfood_targets', JSON.stringify(data));
    showToast('✅ Целевые значения сохранены');
});

function autoCalculateTargets() {
    const getVal = id => parseFloat(document.getElementById(id).value) || 0;
    const kcalMin = getVal('target-kcal-min'), kcalMax = getVal('target-kcal-max');
    const proteinMin = getVal('target-protein-min'), proteinMax = getVal('target-protein-max');
    const fatMin = getVal('target-fat-min'), fatMax = getVal('target-fat-max');

    if (!kcalMin || !kcalMax || !proteinMin || !proteinMax || !fatMin || !fatMax) return null;
    return { kcalMin, kcalMax, proteinMin, proteinMax, fatMin, fatMax };
}

function autoCalculateWeights() {
    const targets = autoCalculateTargets();
    if (!targets) return;

    const pKey = document.getElementById('select-protein').value;
    const p2Key = document.getElementById('select-protein2').value;
    const v1Key = document.getElementById('select-veg1').value;
    const v2Key = document.getElementById('select-veg2').value;
    const v3Key = document.getElementById('select-veg3').value;

    if (!pKey || !v1Key || !v2Key || !v3Key) return;

    const protein1 = customKBju.protein || products.proteins[pKey];
    const protein2 = p2Key ? (customKBju.protein2 || products.proteins[p2Key]) : null;
    const veg1 = customKBju.veg1 || products.mainVeggies[v1Key];
    const veg2 = customKBju.veg2 || products.extraVeggies[v2Key];
    const veg3 = customKBju.veg3 || products.extraVeggies[v3Key];

    cottageCheeseRecommendation = null;
    const warnings = [];

    const MIN_MEAT = 90, MAX_MEAT = 150, MAX_OIL = 9;
    const isWakame2 = v2Key === 'wakame', isWakame3 = v3Key === 'wakame';
    const min2 = isWakame2 ? 5 : 15, min3 = isWakame3 ? 5 : 15;
    const max2 = isWakame2 ? 5 : 100, max3 = isWakame3 ? 5 : 100;

    function calcVeggies(total_meat) {
        let total_veg = 280 - total_meat;
        let vw1 = Math.round(Math.min(100, Math.max(60, total_veg * 0.6)) / 5) * 5;
        let remaining = total_veg - vw1;
        let vw2 = Math.round(Math.max(min2, Math.min(max2, remaining / 2)) / 5) * 5;
        let vw3 = Math.round((remaining - vw2) / 5) * 5;
        
        if (vw3 < min3) { vw3 = min3; vw2 = remaining - vw3; }
        if (vw2 > max2) { vw2 = max2; vw3 = remaining - vw2; }
        if (vw3 > max3) { vw3 = max3; vw2 = remaining - vw3; }

        let carbs = (vw1 * veg1.c + vw2 * veg2.c + vw3 * veg3.c) / 100;
        if (carbs < 5) {
            const veggies = [
                { key: v1Key, w: vw1, data: veg1, min: 60, max: 100 },
                { key: v2Key, w: vw2, data: veg2, min: min2, max: max2 },
                { key: v3Key, w: vw3, data: veg3, min: min3, max: max3 }
            ];
            veggies.sort((a, b) => b.data.c - a.data.c);
            for (let i = 0; i < 50 && carbs < 5; i++) {
                let increased = false;
                for (let v of veggies) {
                    if (v.w < v.max) {
                        const other = veggies.find(x => x.key !== v.key && x.w > x.min);
                        if (other) { v.w += 5; other.w -= 5; increased = true; break; }
                    }
                }
                if (!increased) break;
                carbs = (veggies.find(v => v.key === v1Key).w * veg1.c + veggies.find(v => v.key === v2Key).w * veg2.c + veggies.find(v => v.key === v3Key).w * veg3.c) / 100;
            }
            vw1 = veggies.find(v => v.key === v1Key).w;
            vw2 = veggies.find(v => v.key === v2Key).w;
            vw3 = veggies.find(v => v.key === v3Key).w;
        }

        return { vw1, vw2, vw3 };
    }

    function calcMacros(w1, w2, vw1, vw2, vw3, oil, hasCottage = false) {
        const m_kcal = (w1 * protein1.kcal + w2 * (protein2?.kcal || 0)) / 100;
        const m_p = (w1 * protein1.p + w2 * (protein2?.p || 0)) / 100;
        const m_f = (w1 * protein1.f + w2 * (protein2?.f || 0)) / 100;
        
        const v_kcal = (vw1 * veg1.kcal + vw2 * veg2.kcal + vw3 * veg3.kcal) / 100;
        const v_p = (vw1 * veg1.p + vw2 * veg2.p + vw3 * veg3.p) / 100;
        const v_f = (vw1 * veg1.f + vw2 * veg2.f + vw3 * veg3.f) / 100;
        const v_c = (vw1 * veg1.c + vw2 * veg2.c + vw3 * veg3.c) / 100;

        let cottage_kcal = 0, cottage_p = 0, cottage_f = 0, cottage_c = 0;
        if (hasCottage) {
            const ct = products.cottageCheese['cottage_0'];
            cottage_kcal = ct.kcal * 30 / 100;
            cottage_p = ct.p * 30 / 100;
            cottage_f = ct.f * 30 / 100;
            cottage_c = ct.c * 30 / 100;
        }

        return {
            protein: m_p + v_p + cottage_p,
            fat: m_f + v_f + oil + cottage_f,
            kcal: m_kcal + v_kcal + (oil * 9) + cottage_kcal,
            carbs: v_c + cottage_c,
            base_kcal: m_kcal + v_kcal + cottage_kcal,
            base_fat: m_f + v_f + cottage_f
        };
    }

    let best_w1 = -1, best_w2 = -1, best_oil = 0;
    let best_vw1 = -1, best_vw2 = -1, best_vw3 = -1;
    let best_score = -Infinity;
    let hasValid = false;

    for (let w1 = MIN_MEAT; w1 <= MAX_MEAT; w1 += 5) {
        for (let w2 = 0; w2 <= MAX_MEAT - w1; w2 += 5) {
            if (w1 + w2 < MIN_MEAT) continue;
            
            const veggies = calcVeggies(w1 + w2);
            const base = calcMacros(w1, w2, veggies.vw1, veggies.vw2, veggies.vw3, 0, false);
            
            if (base.protein < targets.proteinMin - 0.5 || base.protein > targets.proteinMax + 0.5) continue;
            if (base.base_kcal > targets.kcalMax) continue;
            if (base.base_fat > targets.fatMax) continue;

            const oil_for_kcal_min = Math.max(0, (targets.kcalMin - base.base_kcal) / 9);
            const oil_for_kcal_max = (targets.kcalMax - base.base_kcal) / 9;
            const oil_for_fat_max = targets.fatMax - base.base_fat;
            
            const oil_min = oil_for_kcal_min;
            const oil_max = Math.min(MAX_OIL, oil_for_kcal_max, oil_for_fat_max);
            
            if (oil_min > oil_max) continue;
            
            const oil = Math.max(0, Math.round((oil_min + Math.min(oil_max, oil_min + 2)) / 2 * 10) / 10);
            
            const final = calcMacros(w1, w2, veggies.vw1, veggies.vw2, veggies.vw3, oil, false);
            
            if (final.kcal < targets.kcalMin - 5 || final.kcal > targets.kcalMax + 5) continue;
            if (final.protein < targets.proteinMin - 1 || final.protein > targets.proteinMax + 1) continue;
            if (final.fat < targets.fatMin - 1 || final.fat > targets.fatMax + 1) continue;
            
            const kcal_mid = (targets.kcalMin + targets.kcalMax) / 2;
            const p_mid = (targets.proteinMin + targets.proteinMax) / 2;
            const f_mid = (targets.fatMin + targets.fatMax) / 2;
            
            const score = -Math.abs(final.kcal - kcal_mid) 
                         - Math.abs(final.protein - p_mid) * 0.8
                         - Math.abs(final.fat - f_mid) * 0.5;
            
            if (score > best_score) {
                best_score = score;
                best_w1 = w1;
                best_w2 = w2;
                best_oil = oil;
                best_vw1 = veggies.vw1;
                best_vw2 = veggies.vw2;
                best_vw3 = veggies.vw3;
                hasValid = true;
            }
        }
    }

    if (!hasValid) {
        for (let w1 = MIN_MEAT; w1 <= MAX_MEAT; w1 += 5) {
            for (let w2 = 0; w2 <= MAX_MEAT - w1; w2 += 5) {
                if (w1 + w2 < MIN_MEAT) continue;
                
                const veggies = calcVeggies(w1 + w2);
                const base = calcMacros(w1, w2, veggies.vw1, veggies.vw2, veggies.vw3, 0, false);
                
                if (base.protein > targets.proteinMax + 2) continue;
                if (base.base_kcal > targets.kcalMax + 50) continue;
                
                const oil = Math.max(0, Math.min(MAX_OIL, targets.fatMax - base.base_fat, (targets.kcalMax - base.base_kcal) / 9));
                const final = calcMacros(w1, w2, veggies.vw1, veggies.vw2, veggies.vw3, oil, false);
                
                const penalty = 
                    Math.max(0, final.kcal - targets.kcalMax) * 2 +
                    Math.max(0, targets.kcalMin - final.kcal) * 1.5 +
                    Math.max(0, final.protein - targets.proteinMax) * 3 +
                    Math.max(0, targets.proteinMin - final.protein) * 2;
                
                const score = -penalty;
                
                if (score > best_score) {
                    best_score = score;
                    best_w1 = w1;
                    best_w2 = w2;
                    best_oil = oil;
                    best_vw1 = veggies.vw1;
                    best_vw2 = veggies.vw2;
                    best_vw3 = veggies.vw3;
                }
            }
        }
    }

    if (best_w1 === -1) {
        best_w1 = MIN_MEAT;
        best_w2 = 0;
        best_oil = 0;
        const veggies = calcVeggies(MIN_MEAT);
        best_vw1 = veggies.vw1;
        best_vw2 = veggies.vw2;
        best_vw3 = veggies.vw3;
    }

    let w1 = best_w1, w2 = best_w2;
    let oil = best_oil;
    let vw1 = best_vw1, vw2 = best_vw2, vw3 = best_vw3;
    let macros = calcMacros(w1, w2, vw1, vw2, vw3, oil, false);

    let hasCottage = false;
    if (macros.protein < targets.proteinMin) {
        cottageCheeseRecommendation = { type: macros.fat < targets.fatMin ? 'cottage_5' : 'cottage_0', amount: 30 };
        hasCottage = true;
        macros = calcMacros(w1, w2, vw1, vw2, vw3, oil, true);
    }

    if (macros.kcal > targets.kcalMax) {
        let adjustAttempts = 0;
        while (macros.kcal > targets.kcalMax && adjustAttempts < 30) {
            const veggies_cal = [
                { key: 'vw1', w: vw1, kcal: veg1.kcal, min: 60 },
                { key: 'vw2', w: vw2, kcal: veg2.kcal, min: min2 },
                { key: 'vw3', w: vw3, kcal: veg3.kcal, min: min3 }
            ].filter(v => v.w > v.min);
            
            veggies_cal.sort((a, b) => b.kcal - a.kcal);
            
            let decreased = false;
            if (veggies_cal.length > 0) {
                const v = veggies_cal[0];
                if (v.key === 'vw1') { vw1 = Math.max(v.min, vw1 - 5); decreased = true; }
                else if (v.key === 'vw2') { vw2 = Math.max(v.min, vw2 - 5); decreased = true; }
                else if (v.key === 'vw3') { vw3 = Math.max(v.min, vw3 - 5); decreased = true; }
            } else if (oil > 0) {
                oil = Math.max(0, oil - 0.5);
                decreased = true;
            } else if (w1 + w2 > MIN_MEAT) {
                if (w1 >= 5) { w1 -= 5; decreased = true; }
                else if (w2 >= 5) { w2 -= 5; decreased = true; }
            }
            
            if (!decreased) break;
            
            macros = calcMacros(w1, w2, vw1, vw2, vw3, oil, hasCottage);
            adjustAttempts++;
        }
    }

    const total_weight = w1 + w2 + vw1 + vw2 + vw3 + (cottageCheeseRecommendation ? cottageCheeseRecommendation.amount : 0);
    if (total_weight > 300) {
        vw1 = Math.max(60, Math.round((vw1 - (total_weight - 300)) / 5) * 5);
    }

    if (macros.protein < targets.proteinMin) warnings.push(`Недобор белка: ${macros.protein.toFixed(1)} г (мин. ${targets.proteinMin} г).`);
    if (macros.protein > targets.proteinMax) warnings.push(`Превышен белок: ${macros.protein.toFixed(1)} г (макс. ${targets.proteinMax} г).`);
    if (macros.fat < targets.fatMin) warnings.push(`Недобор жира: ${macros.fat.toFixed(1)} г (мин. ${targets.fatMin} г).`);
    if (macros.fat > targets.fatMax) warnings.push(`Превышен жир: ${macros.fat.toFixed(1)} г (макс. ${targets.fatMax} г).`);
    if (macros.kcal < targets.kcalMin) warnings.push(`Недобор калорий: ${Math.round(macros.kcal)} ккал (мин. ${targets.kcalMin}). Попробуйте выбрать более жирный белок или увеличить объем овощей.`);
    if (macros.kcal > targets.kcalMax) warnings.push(`Превышены калории: ${Math.round(macros.kcal)} ккал (макс. ${targets.kcalMax}). Попробуйте выбрать менее жирный белок.`);
    if (macros.carbs < 5) warnings.push(`Недобор углеводов: ${macros.carbs.toFixed(1)} г (мин. 5 г).`);

    calculatedRecipe = {
        w1: Math.round(w1), w2: Math.round(w2),
        vw1: Math.round(vw1), vw2: Math.round(vw2), vw3: Math.round(vw3),
        oil, cottageCheese: cottageCheeseRecommendation,
        pKey, p2Key, v1Key, v2Key, v3Key,
        warnings: warnings
    };
}

function adjustRecipeWeight(type, delta) {
    if (!calculatedRecipe) return;
    const targets = autoCalculateTargets();
    if (!targets) return;

    const r = calculatedRecipe;
    const pKey = r.pKey;
    const p2Key = r.p2Key;
    const v1Key = r.v1Key;
    const v2Key = r.v2Key;
    const v3Key = r.v3Key;

    const protein1 = customKBju.protein || products.proteins[pKey];
    const protein2 = p2Key ? (customKBju.protein2 || products.proteins[p2Key]) : null;
    const veg1 = customKBju.veg1 || products.mainVeggies[v1Key];
    const veg2 = customKBju.veg2 || products.extraVeggies[v2Key];
    const veg3 = customKBju.veg3 || products.extraVeggies[v3Key];

    const isWakame2 = v2Key === 'wakame', isWakame3 = v3Key === 'wakame';
    const min2 = isWakame2 ? 5 : 15, min3 = isWakame3 ? 5 : 15;
    const max2 = isWakame2 ? 5 : 100, max3 = isWakame3 ? 5 : 100;

    let w1 = r.w1;
    let w2 = r.w2;
    let vw1 = r.vw1;

    if (type === 'meat1') {
        w1 = Math.max(90, Math.min(150, w1 + delta));
    } else if (type === 'veg1') {
        vw1 = Math.max(60, Math.min(100, vw1 + delta));
    }

    const total_meat = w1 + w2;
    let total_veg = 280 - total_meat;
    
    const min_total_veg = vw1 + min2 + min3;
    if (total_veg < min_total_veg) {
        total_veg = min_total_veg;
    }

    let remaining = total_veg - vw1;
    let vw2 = Math.round(Math.max(min2, Math.min(max2, remaining / 2)) / 5) * 5;
    let vw3 = Math.round((remaining - vw2) / 5) * 5;
    
    if (vw3 < min3) { vw3 = min3; vw2 = remaining - vw3; }
    if (vw2 > max2) { vw2 = max2; vw3 = remaining - vw2; }
    if (vw3 > max3) { vw3 = max3; vw2 = remaining - vw3; }

    const m_kcal = (w1 * protein1.kcal + w2 * (protein2?.kcal || 0)) / 100;
    const m_p = (w1 * protein1.p + w2 * (protein2?.p || 0)) / 100;
    const m_f = (w1 * protein1.f + w2 * (protein2?.f || 0)) / 100;
    
    const v_kcal = (vw1 * veg1.kcal + vw2 * veg2.kcal + vw3 * veg3.kcal) / 100;
    const v_p = (vw1 * veg1.p + vw2 * veg2.p + vw3 * veg3.p) / 100;
    const v_f = (vw1 * veg1.f + vw2 * veg2.f + vw3 * veg3.f) / 100;
    const v_c = (vw1 * veg1.c + vw2 * veg2.c + vw3 * veg3.c) / 100;

    const base_kcal = m_kcal + v_kcal;
    const base_fat = m_f + v_f;
    const base_protein = m_p + v_p;

    // === АВТОМАТИЧЕСКАЯ КОРРЕКТИРОВКА МАСЛА (шаг 1 мл) ===
    let oil = 0;
    
    const kcal_deficit = targets.kcalMin - base_kcal;
    if (kcal_deficit > 0) {
        oil = kcal_deficit / 9;
    }
    
    const fat_deficit = targets.fatMin - base_fat;
    if (fat_deficit > 0) {
        const oil_for_fat = fat_deficit;
        oil = Math.max(oil, oil_for_fat);
    }
    
    // Округляем масло до ЦЕЛОГО (шаг 1 мл)
    oil = Math.round(oil);
    oil = Math.min(oil, 9, targets.fatMax - base_fat, Math.floor((targets.kcalMax - base_kcal) / 9));
    oil = Math.max(0, oil);

    const final_p = base_protein;
    const final_f = base_fat + oil;
    const final_kcal = base_kcal + (oil * 9);
    const final_c = v_c;

    cottageCheeseRecommendation = null;
    if (final_p < targets.proteinMin) {
        cottageCheeseRecommendation = { type: final_f < targets.fatMin ? 'cottage_5' : 'cottage_0', amount: 30 };
    }

    const warnings = [];
    if (final_p < targets.proteinMin) warnings.push(`Недобор белка: ${final_p.toFixed(1)} г (мин. ${targets.proteinMin} г).`);
    if (final_p > targets.proteinMax) warnings.push(`Превышен белок: ${final_p.toFixed(1)} г (макс. ${targets.proteinMax} г).`);
    if (final_f < targets.fatMin) warnings.push(`Недобор жира: ${final_f.toFixed(1)} г (мин. ${targets.fatMin} г).`);
    if (final_f > targets.fatMax) warnings.push(`Превышен жир: ${final_f.toFixed(1)} г (макс. ${targets.fatMax} г).`);
    if (final_kcal < targets.kcalMin) warnings.push(`Недобор калорий: ${Math.round(final_kcal)} ккал (мин. ${targets.kcalMin}).`);
    if (final_kcal > targets.kcalMax) warnings.push(`Превышены калории: ${Math.round(final_kcal)} ккал (макс. ${targets.kcalMax}).`);
    if (final_c < 5) warnings.push(`Недобор углеводов: ${final_c.toFixed(1)} г (мин. 5 г).`);

    calculatedRecipe = {
        w1: Math.round(w1), w2: Math.round(w2),
        vw1: Math.round(vw1), vw2: Math.round(vw2), vw3: Math.round(vw3),
        oil, cottageCheese: cottageCheeseRecommendation,
        pKey, p2Key, v1Key, v2Key, v3Key,
        warnings: warnings
    };

    calculateAndDisplay();
}

function calculateAndDisplay() {
    if (!calculatedRecipe) return;
    const targets = autoCalculateTargets();
    if (!targets) return;
    calculateAndDisplayWithTargets(targets);
}

function calculateAndDisplayWithTargets(targets) {
    if (!calculatedRecipe) return;
    
    const r = calculatedRecipe;
    const p1Base = products.proteins[r.pKey];
    const p2Base = r.p2Key ? products.proteins[r.p2Key] : null;
    const v1Base = products.mainVeggies[r.v1Key];
    const v2Base = products.extraVeggies[r.v2Key];
    const v3Base = products.extraVeggies[r.v3Key];
    
    const p1 = { ...p1Base, ...(customKBju.protein || {}) };
    const p2 = p2Base ? { ...p2Base, ...(customKBju.protein2 || {}) } : null;
    const v1 = { ...v1Base, ...(customKBju.veg1 || {}) };
    const v2 = { ...v2Base, ...(customKBju.veg2 || {}) };
    const v3 = { ...v3Base, ...(customKBju.veg3 || {}) };

    // Округляем веса ПЕРЕД расчетом КБЖУ
    const w1_rounded = Math.round(r.w1);
    const w2_rounded = Math.round(r.w2 || 0);
    const vw1_rounded = Math.round(r.vw1);
    const vw2_rounded = Math.round(r.vw2);
    const vw3_rounded = Math.round(r.vw3);
    const oil_rounded = Math.round(r.oil * 10) / 10; // Округляем масло до 1 знака

    const calc = (prod, w) => ({ kcal: prod.kcal * w / 100, p: prod.p * w / 100, f: prod.f * w / 100, c: prod.c * w / 100 });

    const ingredients = [
        { name: p1.name, weight: w1_rounded, ...calc(p1, w1_rounded), type: 'base', adjustType: 'meat1' }
    ];
    if (w2_rounded > 0 && p2) ingredients.push({ name: p2.name, weight: w2_rounded, ...calc(p2, w2_rounded), type: 'base' });
    ingredients.push(
        { name: v1.name, weight: vw1_rounded, ...calc(v1, vw1_rounded), type: 'base', adjustType: 'veg1' },
        { name: v2.name, weight: vw2_rounded, ...calc(v2, vw2_rounded), type: 'base' },
        { name: v3.name, weight: vw3_rounded, ...calc(v3, vw3_rounded), type: 'base' }
    );

    let totalKcal = ingredients.reduce((s, i) => s + i.kcal, 0);
    let totalP = ingredients.reduce((s, i) => s + i.p, 0);
    let totalF = ingredients.reduce((s, i) => s + i.f, 0);
    let totalC = ingredients.reduce((s, i) => s + i.c, 0);

    if (oil_rounded >= 0.5) {
        const oil_kcal = oil_rounded * 9;
        ingredients.push({ name: 'Оливковое масло', weight: oil_rounded, kcal: oil_kcal, p: 0, f: oil_rounded, c: 0, type: 'serving' });
        totalKcal += oil_kcal;
        totalF += oil_rounded;
    }

    if (r.cottageCheese) {
        const ct = products.cottageCheese[r.cottageCheese.type];
        const cn = calc(ct, r.cottageCheese.amount);
        ingredients.push({ name: ct.name, weight: r.cottageCheese.amount, ...cn, type: 'recommendation' });
        totalKcal += cn.kcal; totalP += cn.p; totalF += cn.f; totalC += cn.c;
    }

    const warnings = [];
    if (totalP < targets.proteinMin) warnings.push(`Недобор белка: ${totalP.toFixed(1)} г (мин. ${targets.proteinMin} г).`);
    if (totalP > targets.proteinMax && (totalP - targets.proteinMax) > 0.5) warnings.push(`Превышен белок: ${totalP.toFixed(1)} г (макс. ${targets.proteinMax} г).`);
    if (totalF < targets.fatMin) warnings.push(`Недобор жира: ${totalF.toFixed(1)} г (мин. ${targets.fatMin} г).`);
    if (totalF > targets.fatMax) warnings.push(`Превышен жир: ${totalF.toFixed(1)} г (макс. ${targets.fatMax} г).`);
    if (totalKcal < targets.kcalMin) warnings.push(`Недобор калорий: ${Math.round(totalKcal)} ккал (мин. ${targets.kcalMin}).`);
    if (totalKcal > targets.kcalMax) warnings.push(`Превышены калории: ${Math.round(totalKcal)} ккал (макс. ${targets.kcalMax}).`);
    if (totalC < 5) warnings.push(`Недобор углеводов: ${totalC.toFixed(1)} г (мин. 5 г).`);

    displayResults({ ingredients, totals: { kcal: totalKcal, p: totalP, f: totalF, c: totalC }, targets, warnings });
}

function displayResults(data) {
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('target-match-section').style.display = 'block';

    const totalWeight = data.ingredients.reduce((s, i) => s + i.weight, 0);

    document.getElementById('algorithm-choice').innerHTML =
        `🎯 Цель: <strong>${data.targets.kcalMin}—${data.targets.kcalMax} ккал</strong>, ` +
        `<strong>${data.targets.proteinMin}—${data.targets.proteinMax} г белка</strong>, ` +
        `<strong>${data.targets.fatMin}—${data.targets.fatMax} г жира</strong>`;

    const warningEl = document.getElementById('meat-warning');
    if (data.warnings.length > 0) {
        warningEl.style.display = 'block';
        warningEl.innerHTML = '⚠️ ' + data.warnings.join('<br>⚠️ ');
    } else {
        warningEl.style.display = 'none';
    }

    const tbody = document.getElementById('result-table-body');
    tbody.innerHTML = '';
    data.ingredients.forEach(ing => {
        const row = document.createElement('tr');
        if (ing.type === 'serving') row.className = 'serving-row';
        if (ing.type === 'recommendation') row.className = 'recommendation-row';
        
        let weightCell = `${ing.weight.toFixed(0)} ${ing.type === 'serving' ? 'мл' : 'г'}`;
        
        // Добавляем кнопки +/- только для первого мяса и главного овоща
        if (ing.adjustType === 'meat1') {
            weightCell = `
                <div class="weight-adjust">
                    <button class="btn-adjust" onclick="adjustRecipeWeight('meat1', -5)">−</button>
                    <span>${ing.weight.toFixed(0)} г</span>
                    <button class="btn-adjust" onclick="adjustRecipeWeight('meat1', 5)">+</button>
                </div>
            `;
        } else if (ing.adjustType === 'veg1') {
            weightCell = `
                <div class="weight-adjust">
                    <button class="btn-adjust" onclick="adjustRecipeWeight('veg1', -5)">−</button>
                    <span>${ing.weight.toFixed(0)} г</span>
                    <button class="btn-adjust" onclick="adjustRecipeWeight('veg1', 5)">+</button>
                </div>
            `;
        }

        row.innerHTML = `<td>${ing.name}</td><td>${weightCell}</td><td>${ing.kcal.toFixed(1)}</td><td>${ing.p.toFixed(1)}</td><td>${ing.f.toFixed(1)}</td><td>${ing.c.toFixed(1)}</td>`;
        tbody.appendChild(row);
    });

    const totalRow = document.createElement('tr');
    totalRow.className = 'total-row';
    totalRow.innerHTML = `<td>ИТОГО</td><td>${totalWeight.toFixed(0)}</td><td>${data.totals.kcal.toFixed(1)}</td><td>${data.totals.p.toFixed(1)}</td><td>${data.totals.f.toFixed(1)}</td><td>${data.totals.c.toFixed(1)}</td>`;
    tbody.appendChild(totalRow);

    const progressBars = document.getElementById('progress-bars');
    progressBars.innerHTML = '';

    const metrics = [
        { label: 'Ккал', actual: data.totals.kcal, min: data.targets.kcalMin, max: data.targets.kcalMax, unit: '', inRange: data.totals.kcal >= data.targets.kcalMin && data.totals.kcal <= data.targets.kcalMax },
        { label: 'Белки', actual: data.totals.p, min: data.targets.proteinMin, max: data.targets.proteinMax, unit: 'г', inRange: data.totals.p >= data.targets.proteinMin && data.totals.p <= data.targets.proteinMax },
        { label: 'Жиры', actual: data.totals.f, min: data.targets.fatMin, max: data.targets.fatMax, unit: 'г', inRange: data.totals.f >= data.targets.fatMin && data.totals.f <= data.targets.fatMax },
        { label: 'Углеводы', actual: data.totals.c, min: 5, max: null, unit: 'г', inRange: data.totals.c >= 5 }
    ];

    metrics.forEach(m => {
        const status = m.inRange ? 'success' : 'error';
        const icon = status === 'success' ? '✅' : '';
        const rangeText = m.max ? `${m.min}—${m.max}` : `≥ ${m.min}`;
        const val = `${m.actual.toFixed(1)}${m.unit} [${rangeText}] ${icon}`;
        
        let percent = 0;
        if (m.max) {
            percent = ((m.actual - m.min) / (m.max - m.min)) * 100;
        } else {
            percent = Math.min((m.actual / m.min) * 100, 100);
        }
        percent = Math.max(0, Math.min(percent, 100));

        const item = document.createElement('div');
        item.className = 'progress-item';
        item.innerHTML = `
            <div class="progress-label"><span>${m.label}</span><span>${val}</span></div>
            <div class="progress-track">
                <div class="progress-fill ${status}" style="width:${percent}%"></div>
            </div>
        `;
        progressBars.appendChild(item);
    });
}

document.getElementById('calculate-btn').addEventListener('click', () => {
    autoCalculateWeights();
    calculateAndDisplay();
});

function saveRecipe() {
    const name = prompt('Введи название рецепта:');
    if (!name || !calculatedRecipe) return;
    const recipe = {
        name,
        createdAt: Date.now(),
        targets: {
            kcalMin: document.getElementById('target-kcal-min').value,
            kcalMax: document.getElementById('target-kcal-max').value,
            proteinMin: document.getElementById('target-protein-min').value,
            proteinMax: document.getElementById('target-protein-max').value,
            fatMin: document.getElementById('target-fat-min').value,
            fatMax: document.getElementById('target-fat-max').value
        },
        calculatedRecipe: JSON.parse(JSON.stringify(calculatedRecipe)),
        customKBju: JSON.parse(JSON.stringify(customKBju))
    };
    const recipes = JSON.parse(localStorage.getItem('dogfood_recipes') || '[]');
    recipes.unshift(recipe);
    localStorage.setItem('dogfood_recipes', JSON.stringify(recipes));
    loadRecipesList();
    showToast(`✅ Рецепт "${name}" сохранен`);
}

function updateRecipe() {
    if (activeRecipeIndex === null || !calculatedRecipe) {
        showToast('⚠️ Сначала загрузите рецепт из списка');
        return;
    }
    
    const recipes = JSON.parse(localStorage.getItem('dogfood_recipes') || '[]');
    const r = recipes[activeRecipeIndex];
    if (!r) return;
    
    const newName = prompt('Название рецепта (оставьте пустым, чтобы не менять):', r.name);
    if (newName === null) return;
    if (newName.trim() !== '') r.name = newName.trim();
    
    r.targets = {
        kcalMin: document.getElementById('target-kcal-min').value,
        kcalMax: document.getElementById('target-kcal-max').value,
        proteinMin: document.getElementById('target-protein-min').value,
        proteinMax: document.getElementById('target-protein-max').value,
        fatMin: document.getElementById('target-fat-min').value,
        fatMax: document.getElementById('target-fat-max').value
    };
    r.calculatedRecipe = JSON.parse(JSON.stringify(calculatedRecipe));
    r.customKBju = JSON.parse(JSON.stringify(customKBju));
    r.updatedAt = Date.now();
    
    recipes[activeRecipeIndex] = r;
    localStorage.setItem('dogfood_recipes', JSON.stringify(recipes));
    
    loadRecipesList();
    showToast(`✅ Рецепт "${r.name}" обновлен`);
}

function loadRecipesList() {
    const recipes = JSON.parse(localStorage.getItem('dogfood_recipes') || '[]');
    const list = document.getElementById('recipes-list');
    if (!list) return;
    
    if (recipes.length === 0) { 
        list.innerHTML = '<p class="empty-state">Нет сохраненных рецептов</p>'; 
        return; 
    }
    
    list.innerHTML = '';
    recipes.forEach((r, i) => {
        const tile = document.createElement('div');
        tile.className = 'recipe-tile';
        
        if (i === activeRecipeIndex) {
            tile.classList.add('active');
        }
        
        tile.onclick = (e) => {
            if (!e.target.closest('.recipe-tile-delete')) {
                activeRecipeIndex = i;
                loadRecipe(i);
                loadRecipesList();
            }
        };
        
        const cr = r.calculatedRecipe || {};
        const emojis = [
            getEmoji(cr.pKey),
            cr.p2Key ? getEmoji(cr.p2Key) : '',
            getEmoji(cr.v1Key),
            getEmoji(cr.v2Key),
            getEmoji(cr.v3Key)
        ].filter(Boolean).join(' ');
        
        tile.innerHTML = `
            <button class="recipe-tile-delete" onclick="deleteRecipe(${i})" title="Удалить">×</button>
            <div class="recipe-tile-emojis">${emojis}</div>
            <div class="recipe-tile-name">${r.name}</div>
        `;
        list.appendChild(tile);
    });
}

function loadRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('dogfood_recipes') || '[]');
    const r = recipes[index];
    if (!r) return;

    document.getElementById('target-kcal-min').value = r.targets.kcalMin;
    document.getElementById('target-kcal-max').value = r.targets.kcalMax;
    document.getElementById('target-protein-min').value = r.targets.proteinMin;
    document.getElementById('target-protein-max').value = r.targets.proteinMax;
    document.getElementById('target-fat-min').value = r.targets.fatMin;
    document.getElementById('target-fat-max').value = r.targets.fatMax;
    
    document.getElementById('select-protein').value = r.calculatedRecipe.pKey;
    document.getElementById('select-protein2').value = r.calculatedRecipe.p2Key || '';
    document.getElementById('select-veg1').value = r.calculatedRecipe.v1Key;
    document.getElementById('select-veg2').value = r.calculatedRecipe.v2Key;
    document.getElementById('select-veg3').value = r.calculatedRecipe.v3Key;
    
    customKBju = { protein: null, protein2: null, veg1: null, veg2: null, veg3: null };
    if (r.customKBju) {
        Object.assign(customKBju, r.customKBju);
        ['protein', 'protein2', 'veg1', 'veg2', 'veg3'].forEach(t => updateKbjuFields(t));
    }
    
    calculatedRecipe = r.calculatedRecipe;
    activeRecipeIndex = index;
    
    const targets = {
        kcalMin: parseFloat(r.targets.kcalMin),
        kcalMax: parseFloat(r.targets.kcalMax),
        proteinMin: parseFloat(r.targets.proteinMin),
        proteinMax: parseFloat(r.targets.proteinMax),
        fatMin: parseFloat(r.targets.fatMin),
        fatMax: parseFloat(r.targets.fatMax)
    };

    calculateAndDisplayWithTargets(targets);
    
    const updateBtn = document.getElementById('update-recipe-btn');
    if (updateBtn) updateBtn.style.display = 'block';
    
    showToast(`✅ Рецепт "${r.name}" загружен`);
}

function deleteRecipe(index) {
    if (!confirm('Удалить этот рецепт?')) return;
    const recipes = JSON.parse(localStorage.getItem('dogfood_recipes') || '[]');
    recipes.splice(index, 1);
    localStorage.setItem('dogfood_recipes', JSON.stringify(recipes));
    
    if (index === activeRecipeIndex) {
        activeRecipeIndex = null;
        const updateBtn = document.getElementById('update-recipe-btn');
        if (updateBtn) updateBtn.style.display = 'none';
    } else if (index < activeRecipeIndex) {
        activeRecipeIndex--;
    }
    
    loadRecipesList();
    showToast('✅ Рецепт удален');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2000);
}

document.getElementById('save-recipe-btn').addEventListener('click', saveRecipe);
document.getElementById('update-recipe-btn').addEventListener('click', updateRecipe);

populateSelects();
loadSavedData();