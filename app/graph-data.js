window.GR_COURSE_GRAPH = {
  "nodes": [
    {
      "id": "lorentz-transformation",
      "label": "洛伦兹变换",
      "name_en": "Lorentz Transformation",
      "chapter": 1,
      "importance": 4,
      "learning_objective": "理解光速不变如何要求惯性系之间采用洛伦兹变换。",
      "common_misconception": "容易把洛伦兹变换看成普通坐标替换，而忽略它保持时空间隔不变。",
      "ai_learning_task": "让 AI 判断一个给定矩阵是否为洛伦兹变换，并检查它是否实际满足度规不变条件，指出并修正错误步骤。",
      "prerequisites": [],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "spacetime-interval-light-cone",
      "label": "时空间隔与光锥",
      "name_en": "Spacetime Interval and Light Cone",
      "chapter": 1,
      "importance": 5,
      "learning_objective": "区分类时、类空、类光间隔，并用光锥判断因果关系。",
      "common_misconception": "容易认为空间距离越近就一定能发生因果联系，而忽略光锥限制。",
      "ai_learning_task": "让 AI 分类三组事件间隔为类时、类空或类光，并核对符号约定和因果结论是否一致，写出修正理由。",
      "prerequisites": [
        "lorentz-transformation"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "four-vector",
      "label": "四矢量",
      "name_en": "Four-vector",
      "chapter": 1,
      "importance": 4,
      "learning_objective": "理解四矢量在洛伦兹变换下的变换规律及其物理意义。",
      "common_misconception": "容易把任意四个数都称为四矢量，而不检验其变换规律。",
      "ai_learning_task": "让 AI 判断坐标、四速度和普通三速度是否都是四矢量，并评价其变换依据是否充分，补充遗漏条件。",
      "prerequisites": [
        "spacetime-interval-light-cone"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "tensor",
      "label": "张量",
      "name_en": "Tensor",
      "chapter": 1,
      "importance": 5,
      "learning_objective": "掌握张量指标结构与协变变换规律。",
      "common_misconception": "容易把有多个指标的数组都当作张量，而忽略坐标变换规律。",
      "ai_learning_task": "让 AI 给出一个二阶对象是否为张量的判据，并检查回答是否只看指标个数，若不充分则重写判据。",
      "prerequisites": [
        "four-vector"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "proper-time-four-momentum",
      "label": "固有时与四动量",
      "name_en": "Proper Time and Four-momentum",
      "chapter": 1,
      "importance": 4,
      "learning_objective": "用固有时参数化世界线，并由四速度定义四动量。",
      "common_misconception": "容易把坐标时间当作所有观者共同测得的粒子时间。",
      "ai_learning_task": "让 AI 从一条粒子轨迹计算固有时和四动量，并检查它是否误用坐标时间，给出正确计算。",
      "prerequisites": [
        "four-vector"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "stress-energy-tensor",
      "label": "能量-动量张量",
      "name_en": "Stress-energy Tensor",
      "chapter": 1,
      "importance": 5,
      "learning_objective": "理解能量密度、动量密度、能流和应力如何组织进能量-动量张量。",
      "common_misconception": "容易只把能量-动量张量看作能量密度，而忽略压力和动量流。",
      "ai_learning_task": "让 AI 解释理想流体能量-动量张量各项含义，并检查它是否遗漏压力项或混淆指标含义，写出修正版。",
      "prerequisites": [
        "tensor",
        "proper-time-four-momentum"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "equivalence-principle",
      "label": "等效原理",
      "name_en": "Equivalence Principle",
      "chapter": 2,
      "importance": 5,
      "learning_objective": "理解惯性质量与引力质量相等如何指向引力的几何解释。",
      "common_misconception": "容易把等效原理理解为引力在所有区域都能被完全消除。",
      "ai_learning_task": "让 AI 比较自由下落电梯和均匀引力场的物理结论，并检查它是否忽略局域性和潮汐效应。",
      "prerequisites": [
        "proper-time-four-momentum"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "gravitational-redshift",
      "label": "引力红移",
      "name_en": "Gravitational Redshift",
      "chapter": 2,
      "importance": 4,
      "learning_objective": "理解引力势差如何导致钟速和光频率的差异。",
      "common_misconception": "容易把引力红移解释成光在传播中简单损失能量，而忽略观者固有时的比较。",
      "ai_learning_task": "让 AI 推导弱场引力红移公式，并检查其符号是否与高处和低处钟速结论一致，修正错误符号。",
      "prerequisites": [
        "equivalence-principle",
        "proper-time-four-momentum"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "manifold-coordinate-chart",
      "label": "流形与坐标图",
      "name_en": "Manifold and Coordinate Chart",
      "chapter": 2,
      "importance": 5,
      "learning_objective": "理解流形作为局域类似平直空间但整体可弯曲的时空模型。",
      "common_misconception": "容易把坐标图等同于流形本身，而忽略多个坐标图的拼接。",
      "ai_learning_task": "让 AI 解释为什么球面不能用一个光滑坐标图覆盖，并检查它是否把坐标奇点误认为物理奇点。",
      "prerequisites": [
        "equivalence-principle"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "tangent-space-vector-field",
      "label": "切空间与矢量场",
      "name_en": "Tangent Space and Vector Field",
      "chapter": 3,
      "importance": 4,
      "learning_objective": "理解流形每一点的切空间如何承载矢量和矢量场。",
      "common_misconception": "容易把不同点的矢量直接相加或比较，而忽略它们属于不同切空间。",
      "ai_learning_task": "让 AI 判断两个不同流形点上的矢量能否直接相减，并检查其理由是否说明了切空间差异。",
      "prerequisites": [
        "manifold-coordinate-chart",
        "tensor"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "metric-tensor",
      "label": "度规张量",
      "name_en": "Metric Tensor",
      "chapter": 3,
      "importance": 5,
      "learning_objective": "理解度规如何定义线元、固有时和时空几何。",
      "common_misconception": "容易把度规只看成一个矩阵，而忽略它定义物理测量和引力场。",
      "ai_learning_task": "让 AI 比较闵可夫斯基度规和一般弯曲时空度规，并检查它是否正确说明坐标依赖与几何不变量的区别。",
      "prerequisites": [
        "tensor",
        "manifold-coordinate-chart"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "covariant-derivative",
      "label": "协变导数",
      "name_en": "Covariant Derivative",
      "chapter": 4,
      "importance": 5,
      "learning_objective": "理解为什么弯曲流形上的偏导数需要推广为协变导数。",
      "common_misconception": "容易认为偏导数自动给出张量，而忽略坐标变换中的额外项。",
      "ai_learning_task": "让 AI 说明矢量偏导数为何不是张量，并检查它是否写出了额外变换项的来源。",
      "prerequisites": [
        "tensor",
        "tangent-space-vector-field"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "connection-christoffel",
      "label": "联络与克氏符",
      "name_en": "Connection and Christoffel Symbols",
      "chapter": 4,
      "importance": 5,
      "learning_objective": "理解联络如何补偿基矢变化并给出协变导数的坐标表达。",
      "common_misconception": "容易把克氏符当作张量，从而错误地升降或比较其分量。",
      "ai_learning_task": "让 AI 判断克氏符是否为张量，并检查其论证是否包含非齐次坐标变换项，补充缺失说明。",
      "prerequisites": [
        "covariant-derivative",
        "metric-tensor"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "parallel-transport",
      "label": "平行移动",
      "name_en": "Parallel Transport",
      "chapter": 4,
      "importance": 4,
      "learning_objective": "理解沿曲线保持矢量平行的条件及其路径依赖性。",
      "common_misconception": "容易认为平行移动在弯曲时空中与平直空间一样与路径无关。",
      "ai_learning_task": "让 AI 比较球面上两条路径的平行移动结果，并检查它是否明确指出曲率导致路径依赖。",
      "prerequisites": [
        "connection-christoffel"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "geodesic-equation",
      "label": "测地线方程",
      "name_en": "Geodesic Equation",
      "chapter": 4,
      "importance": 5,
      "learning_objective": "理解自由粒子轨迹由四速度沿自身平行移动给出。",
      "common_misconception": "容易把测地线简单理解为空间距离最短，而忽略类时路径固有时极值和类光仿射参数。",
      "ai_learning_task": "让 AI 从固有时泛函推出测地线方程，并检查它是否处理了边界项和参数选择。",
      "prerequisites": [
        "connection-christoffel",
        "proper-time-four-momentum"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "riemann-normal-coordinates",
      "label": "黎曼法坐标",
      "name_en": "Riemann Normal Coordinates",
      "chapter": 4,
      "importance": 3,
      "learning_objective": "理解局域惯性坐标中度规和一阶导数在一点处的特殊形式。",
      "common_misconception": "容易认为选取黎曼法坐标能让有限区域内的曲率消失。",
      "ai_learning_task": "让 AI 判断在黎曼法坐标中哪些量可在一点处置零，并检查它是否错误地把曲率也置零。",
      "prerequisites": [
        "geodesic-equation",
        "metric-tensor"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "riemann-curvature-tensor",
      "label": "黎曼曲率张量",
      "name_en": "Riemann Curvature Tensor",
      "chapter": 5,
      "importance": 5,
      "learning_objective": "理解黎曼曲率张量如何刻画协变导数不对易和平行移动回路效应。",
      "common_misconception": "容易把曲率只理解为嵌入空间中的弯曲外观，而忽略内禀定义。",
      "ai_learning_task": "让 AI 解释曲率张量与协变导数对易子的关系，并检查指标位置和符号约定是否自洽。",
      "prerequisites": [
        "covariant-derivative",
        "parallel-transport"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "ricci-curvature-scalar",
      "label": "里奇曲率与曲率标量",
      "name_en": "Ricci Curvature and Ricci Scalar",
      "chapter": 5,
      "importance": 4,
      "learning_objective": "理解由黎曼曲率缩并得到里奇张量和曲率标量的意义。",
      "common_misconception": "容易认为缩并后的曲率包含黎曼张量的全部信息。",
      "ai_learning_task": "让 AI 比较黎曼张量、里奇张量和曲率标量的信息量，并检查它是否错误声称三者等价。",
      "prerequisites": [
        "riemann-curvature-tensor",
        "metric-tensor"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "einstein-tensor-bianchi",
      "label": "爱因斯坦张量与比安基恒等式",
      "name_en": "Einstein Tensor and Bianchi Identity",
      "chapter": 7,
      "importance": 5,
      "learning_objective": "理解爱因斯坦张量的构造及其协变散度为零的约束意义。",
      "common_misconception": "容易把比安基恒等式看作额外动力学方程，而不是几何恒等式。",
      "ai_learning_task": "让 AI 说明为什么场方程左边选用爱因斯坦张量，并检查它是否正确连接到能量-动量守恒。",
      "prerequisites": [
        "ricci-curvature-scalar",
        "covariant-derivative"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "einstein-field-equation",
      "label": "爱因斯坦场方程",
      "name_en": "Einstein Field Equation",
      "chapter": 7,
      "importance": 5,
      "learning_objective": "理解爱因斯坦场方程如何把时空几何与物质能量动量联系起来。",
      "common_misconception": "容易把场方程理解为单个代数公式，而忽略它是非线性偏微分方程组。",
      "ai_learning_task": "让 AI 逐项解释场方程两边含义，并检查它是否说明了张量方程和坐标无关性。",
      "prerequisites": [
        "einstein-tensor-bianchi",
        "stress-energy-tensor"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "einstein-hilbert-action",
      "label": "爱因斯坦-希尔伯特作用量",
      "name_en": "Einstein-Hilbert Action",
      "chapter": 7,
      "importance": 4,
      "learning_objective": "理解引力作用量如何通过对度规变分得到场方程。",
      "common_misconception": "容易忽略体积元和边界项，把变分过程当作普通函数求导。",
      "ai_learning_task": "让 AI 概述从爱因斯坦-希尔伯特作用量到场方程的步骤，并检查它是否遗漏对度规行列式的变分。",
      "prerequisites": [
        "ricci-curvature-scalar",
        "einstein-field-equation"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "newtonian-limit",
      "label": "牛顿极限",
      "name_en": "Newtonian Limit",
      "chapter": 7,
      "importance": 4,
      "learning_objective": "理解弱场低速极限下广义相对论如何恢复牛顿引力。",
      "common_misconception": "容易只检查粒子运动方程，而不检查场方程如何回到泊松方程。",
      "ai_learning_task": "让 AI 推导弱场极限中的引力势关系，并检查它是否同时说明测地线方程和场方程两部分。",
      "prerequisites": [
        "einstein-field-equation",
        "geodesic-equation"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "gauge-nonlinearity",
      "label": "规范自由度与非线性",
      "name_en": "Gauge Freedom and Nonlinearity",
      "chapter": 8,
      "importance": 4,
      "learning_objective": "理解坐标变换自由和非线性如何影响爱因斯坦方程的求解。",
      "common_misconception": "容易把十个度规分量都看成独立物理自由度。",
      "ai_learning_task": "让 AI 解释为何十个场方程不等于十个独立动力学自由度，并检查它是否正确计入约束和规范自由度。",
      "prerequisites": [
        "einstein-field-equation"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "schwarzschild-metric",
      "label": "史瓦西度规",
      "name_en": "Schwarzschild Metric",
      "chapter": 10,
      "importance": 5,
      "learning_objective": "理解真空静态球对称假设如何导向史瓦西解及其物理参数。",
      "common_misconception": "容易把史瓦西坐标中的奇异因子直接等同于物理奇点。",
      "ai_learning_task": "让 AI 识别史瓦西度规中 r=2GM 与 r=0 的差异，并检查它是否混淆坐标奇点和曲率奇点。",
      "prerequisites": [
        "einstein-field-equation",
        "metric-tensor"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "birkhoff-theorem",
      "label": "伯克霍夫定理",
      "name_en": "Birkhoff Theorem",
      "chapter": 10,
      "importance": 3,
      "learning_objective": "理解真空球对称解唯一为史瓦西解的物理含义。",
      "common_misconception": "容易把伯克霍夫定理误用到非真空或非球对称情形。",
      "ai_learning_task": "让 AI 判断一个含物质的球对称恒星外部是否可用伯克霍夫定理，并检查它是否明确区分内部和外部区域。",
      "prerequisites": [
        "schwarzschild-metric"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "schwarzschild-geodesics",
      "label": "史瓦西时空中的测地线",
      "name_en": "Geodesics in Schwarzschild Spacetime",
      "chapter": 11,
      "importance": 4,
      "learning_objective": "理解史瓦西背景中粒子和光线运动的守恒量与有效势方法。",
      "common_misconception": "容易把平直时空的直线运动直觉直接套用到史瓦西时空。",
      "ai_learning_task": "让 AI 写出史瓦西测地线的守恒能量和角动量，并检查它是否正确利用时间平移和轴对称性。",
      "prerequisites": [
        "geodesic-equation",
        "schwarzschild-metric"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "classical-tests",
      "label": "广义相对论经典检验",
      "name_en": "Classical Tests of General Relativity",
      "chapter": 11,
      "importance": 5,
      "learning_objective": "理解水星近日点进动、光线偏折和引力红移如何检验广义相对论。",
      "common_misconception": "容易把经典检验看成彼此无关的现象，而忽略它们共享史瓦西几何背景。",
      "ai_learning_task": "让 AI 比较三个经典检验各自依赖的物理量，并检查它是否把光线偏折误解释为牛顿粒子轨道。",
      "prerequisites": [
        "schwarzschild-geodesics",
        "gravitational-redshift"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "event-horizon",
      "label": "事件视界",
      "name_en": "Event Horizon",
      "chapter": 12,
      "importance": 5,
      "learning_objective": "理解事件视界作为无法逃逸到无穷远的因果边界。",
      "common_misconception": "容易把事件视界理解为普通物质表面或局域可见边界。",
      "ai_learning_task": "让 AI 解释为什么史瓦西半径处是类光超曲面，并检查它是否把视界当成物理硬壳。",
      "prerequisites": [
        "schwarzschild-metric",
        "spacetime-interval-light-cone"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "kruskal-penrose-structure",
      "label": "Kruskal 坐标与彭罗斯图",
      "name_en": "Kruskal Coordinates and Penrose Diagram",
      "chapter": 12,
      "importance": 4,
      "learning_objective": "理解坐标延拓和彭罗斯图如何揭示黑洞整体因果结构。",
      "common_misconception": "容易把史瓦西坐标覆盖不到的区域误认为不存在。",
      "ai_learning_task": "让 AI 解读一个简化彭罗斯图中的视界、奇点和无穷远，并检查它是否区分坐标边界与时空边界。",
      "prerequisites": [
        "event-horizon",
        "geodesic-equation"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "kerr-black-hole-shadow",
      "label": "Kerr 黑洞与黑洞阴影",
      "name_en": "Kerr Black Hole and Black Hole Shadow",
      "chapter": 13,
      "importance": 3,
      "learning_objective": "理解旋转黑洞中对称性、光子轨道和观测者天空阴影之间的关系。",
      "common_misconception": "容易认为黑洞阴影就是事件视界的直接照片。",
      "ai_learning_task": "让 AI 描述从 Kerr 度规到阴影轮廓的推导链，并检查它是否混淆光子捕获区域、临界轨道和视界半径。",
      "prerequisites": [
        "event-horizon",
        "schwarzschild-geodesics"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": false
    },
    {
      "id": "gravitational-waves",
      "label": "引力波",
      "name_en": "Gravitational Waves",
      "chapter": 16,
      "importance": 3,
      "learning_objective": "理解引力波作为时空几何扰动传播及黑洞并合观测证据的基本地位。",
      "common_misconception": "容易把引力波理解为空间中传播的普通介质波，而忽略它是度规扰动。",
      "ai_learning_task": "让 AI 给出引力波与电磁波的类比和差异，并检查它是否明确说明讲义中该部分证据较少，需要教师确认细节。",
      "prerequisites": [
        "einstein-field-equation",
        "gauge-nonlinearity"
      ],
      "related_materials": [
        "materials/gr_lecture.pdf"
      ],
      "needs_teacher_review": true
    }
  ],
  "edges": [
    {
      "source": "lorentz-transformation",
      "target": "spacetime-interval-light-cone",
      "relation": "supports",
      "description": "洛伦兹变换保持时空间隔不变，从而支撑光锥结构。"
    },
    {
      "source": "spacetime-interval-light-cone",
      "target": "four-vector",
      "relation": "prerequisite_of",
      "description": "四矢量的定义依赖时空坐标和洛伦兹不变量的结构。"
    },
    {
      "source": "four-vector",
      "target": "tensor",
      "relation": "prerequisite_of",
      "description": "张量变换规律是四矢量变换规律的推广。"
    },
    {
      "source": "four-vector",
      "target": "proper-time-four-momentum",
      "relation": "prerequisite_of",
      "description": "四速度和四动量建立在四矢量语言之上。"
    },
    {
      "source": "tensor",
      "target": "stress-energy-tensor",
      "relation": "prerequisite_of",
      "description": "能量-动量张量是描述能量和动量流的二阶张量。"
    },
    {
      "source": "proper-time-four-momentum",
      "target": "stress-energy-tensor",
      "relation": "supports",
      "description": "四动量帮助理解能量和动量密度进入张量的方式。"
    },
    {
      "source": "proper-time-four-momentum",
      "target": "equivalence-principle",
      "relation": "supports",
      "description": "固有时和自由粒子运动为理解局域自由下落参考系提供基础。"
    },
    {
      "source": "equivalence-principle",
      "target": "gravitational-redshift",
      "relation": "derived_from",
      "description": "引力红移可由等效原理和加速参考系类比得到。"
    },
    {
      "source": "equivalence-principle",
      "target": "manifold-coordinate-chart",
      "relation": "supports",
      "description": "等效原理提示时空局域平直而整体可弯曲，促使引入流形。"
    },
    {
      "source": "manifold-coordinate-chart",
      "target": "tangent-space-vector-field",
      "relation": "prerequisite_of",
      "description": "切空间和矢量场是在流形每一点上定义的结构。"
    },
    {
      "source": "tensor",
      "target": "tangent-space-vector-field",
      "relation": "prerequisite_of",
      "description": "流形上的张量场需要先理解矢量和对偶矢量。"
    },
    {
      "source": "manifold-coordinate-chart",
      "target": "metric-tensor",
      "relation": "prerequisite_of",
      "description": "度规是放置在流形上的几何结构。"
    },
    {
      "source": "tensor",
      "target": "metric-tensor",
      "relation": "prerequisite_of",
      "description": "度规本身是二阶对称张量场。"
    },
    {
      "source": "tangent-space-vector-field",
      "target": "covariant-derivative",
      "relation": "prerequisite_of",
      "description": "协变导数解决不同点切空间中矢量变化的比较问题。"
    },
    {
      "source": "tensor",
      "target": "covariant-derivative",
      "relation": "prerequisite_of",
      "description": "协变导数要求导数结果仍按张量方式变换。"
    },
    {
      "source": "covariant-derivative",
      "target": "connection-christoffel",
      "relation": "derived_from",
      "description": "联络系数是协变导数相对偏导数的修正项。"
    },
    {
      "source": "metric-tensor",
      "target": "connection-christoffel",
      "relation": "supports",
      "description": "与度规适配且无挠的联络给出常用克氏符。"
    },
    {
      "source": "connection-christoffel",
      "target": "parallel-transport",
      "relation": "prerequisite_of",
      "description": "平行移动由联络规定沿曲线怎样保持矢量平行。"
    },
    {
      "source": "connection-christoffel",
      "target": "geodesic-equation",
      "relation": "prerequisite_of",
      "description": "测地线方程的坐标形式包含克氏符。"
    },
    {
      "source": "proper-time-four-momentum",
      "target": "geodesic-equation",
      "relation": "supports",
      "description": "类时测地线常用固有时和四速度表达。"
    },
    {
      "source": "metric-tensor",
      "target": "geodesic-equation",
      "relation": "supports",
      "description": "测地线也可由固有时或线长泛函的极值导出。"
    },
    {
      "source": "geodesic-equation",
      "target": "riemann-normal-coordinates",
      "relation": "prerequisite_of",
      "description": "黎曼法坐标通过指数映射和测地线在一点附近构造。"
    },
    {
      "source": "metric-tensor",
      "target": "riemann-normal-coordinates",
      "relation": "supports",
      "description": "黎曼法坐标使一点处度规化为平直形式并消去一阶导数。"
    },
    {
      "source": "parallel-transport",
      "target": "riemann-curvature-tensor",
      "relation": "supports",
      "description": "闭合回路平行移动的变化揭示曲率。"
    },
    {
      "source": "covariant-derivative",
      "target": "riemann-curvature-tensor",
      "relation": "derived_from",
      "description": "黎曼曲率张量可由协变导数对易子定义。"
    },
    {
      "source": "connection-christoffel",
      "target": "riemann-curvature-tensor",
      "relation": "supports",
      "description": "曲率张量的坐标表达由联络及其导数构成。"
    },
    {
      "source": "riemann-curvature-tensor",
      "target": "ricci-curvature-scalar",
      "relation": "derived_from",
      "description": "里奇张量和曲率标量由黎曼曲率张量缩并得到。"
    },
    {
      "source": "metric-tensor",
      "target": "ricci-curvature-scalar",
      "relation": "supports",
      "description": "曲率标量需要用度规对里奇张量再缩并。"
    },
    {
      "source": "ricci-curvature-scalar",
      "target": "einstein-tensor-bianchi",
      "relation": "derived_from",
      "description": "爱因斯坦张量由里奇张量、曲率标量和度规组合而成。"
    },
    {
      "source": "covariant-derivative",
      "target": "einstein-tensor-bianchi",
      "relation": "supports",
      "description": "比安基恒等式以协变散度为零的形式表达。"
    },
    {
      "source": "einstein-tensor-bianchi",
      "target": "einstein-field-equation",
      "relation": "prerequisite_of",
      "description": "爱因斯坦张量构成场方程的几何左边。"
    },
    {
      "source": "stress-energy-tensor",
      "target": "einstein-field-equation",
      "relation": "prerequisite_of",
      "description": "能量-动量张量构成场方程的物质源右边。"
    },
    {
      "source": "metric-tensor",
      "target": "einstein-field-equation",
      "relation": "supports",
      "description": "爱因斯坦方程是关于度规张量的动力学方程。"
    },
    {
      "source": "ricci-curvature-scalar",
      "target": "einstein-hilbert-action",
      "relation": "prerequisite_of",
      "description": "爱因斯坦-希尔伯特作用量的核心拉格朗日量是曲率标量。"
    },
    {
      "source": "einstein-hilbert-action",
      "target": "einstein-field-equation",
      "relation": "derived_from",
      "description": "对作用量关于度规变分可得到爱因斯坦场方程。"
    },
    {
      "source": "einstein-field-equation",
      "target": "newtonian-limit",
      "relation": "applied_to",
      "description": "弱场低速近似下场方程应回到牛顿引力。"
    },
    {
      "source": "geodesic-equation",
      "target": "newtonian-limit",
      "relation": "applied_to",
      "description": "测地线方程在低速弱场中回到牛顿运动方程。"
    },
    {
      "source": "einstein-field-equation",
      "target": "gauge-nonlinearity",
      "relation": "supports",
      "description": "爱因斯坦方程的张量形式带来坐标规范自由度和非线性。"
    },
    {
      "source": "einstein-tensor-bianchi",
      "target": "gauge-nonlinearity",
      "relation": "supports",
      "description": "比安基恒等式对应场方程中的约束关系。"
    },
    {
      "source": "einstein-field-equation",
      "target": "schwarzschild-metric",
      "relation": "applied_to",
      "description": "史瓦西度规是真空球对称条件下求解爱因斯坦方程得到的解。"
    },
    {
      "source": "metric-tensor",
      "target": "schwarzschild-metric",
      "relation": "prerequisite_of",
      "description": "史瓦西解以具体线元和度规分量形式表达。"
    },
    {
      "source": "schwarzschild-metric",
      "target": "birkhoff-theorem",
      "relation": "supports",
      "description": "伯克霍夫定理说明真空球对称解唯一为史瓦西解。"
    },
    {
      "source": "schwarzschild-metric",
      "target": "schwarzschild-geodesics",
      "relation": "prerequisite_of",
      "description": "史瓦西时空中的测地线需要以史瓦西度规为背景。"
    },
    {
      "source": "geodesic-equation",
      "target": "schwarzschild-geodesics",
      "relation": "prerequisite_of",
      "description": "史瓦西粒子和光线运动是测地线方程的具体应用。"
    },
    {
      "source": "schwarzschild-geodesics",
      "target": "classical-tests",
      "relation": "applied_to",
      "description": "水星近日点进动和光线偏折依赖史瓦西测地运动。"
    },
    {
      "source": "gravitational-redshift",
      "target": "classical-tests",
      "relation": "part_of",
      "description": "引力红移是广义相对论三大经典检验之一。"
    },
    {
      "source": "schwarzschild-metric",
      "target": "event-horizon",
      "relation": "supports",
      "description": "史瓦西半径处的类光超曲面给出事件视界。"
    },
    {
      "source": "spacetime-interval-light-cone",
      "target": "event-horizon",
      "relation": "prerequisite_of",
      "description": "事件视界的定义依赖因果结构和类光边界。"
    },
    {
      "source": "event-horizon",
      "target": "kruskal-penrose-structure",
      "relation": "prerequisite_of",
      "description": "Kruskal 坐标和彭罗斯图用于延拓和展示视界结构。"
    },
    {
      "source": "geodesic-equation",
      "target": "kruskal-penrose-structure",
      "relation": "supports",
      "description": "彭罗斯图中的奇点和无穷远常通过测地线完备性理解。"
    },
    {
      "source": "event-horizon",
      "target": "kerr-black-hole-shadow",
      "relation": "prerequisite_of",
      "description": "Kerr 黑洞阴影的光子捕获与黑洞视界密切相关。"
    },
    {
      "source": "schwarzschild-geodesics",
      "target": "kerr-black-hole-shadow",
      "relation": "supports",
      "description": "Kerr 阴影推导延续了从度规出发研究光线测地线的思路。"
    },
    {
      "source": "einstein-field-equation",
      "target": "gravitational-waves",
      "relation": "derived_from",
      "description": "引力波来自爱因斯坦方程的扰动传播解。"
    },
    {
      "source": "gauge-nonlinearity",
      "target": "gravitational-waves",
      "relation": "supports",
      "description": "线性化引力波需要处理度规扰动中的规范自由度。"
    },
    {
      "source": "gravitational-waves",
      "target": "kerr-black-hole-shadow",
      "relation": "supports",
      "description": "黑洞并合引力波和黑洞阴影都是强引力天体的观测窗口。"
    }
  ]
};
