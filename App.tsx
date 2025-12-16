import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <style>{`
        body {
            font-family: 'Noto Sans SC', sans-serif;
            background-color: #f3f4f6;
            color: #333;
            -webkit-print-color-adjust: exact;
        }

        .a4-page {
            max-width: 210mm;
            margin: 40px auto;
            background: white;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 40px 48px;
            box-sizing: border-box;
            min-height: 297mm;
        }

        .section-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: #1e3a8a;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
        }
        
        .section-title i {
            margin-right: 10px;
            color: #3b82f6;
        }

        .highlights-box {
            background-color: #f8fafc;
            border-left: 4px solid #3b82f6;
            padding: 16px;
            border-radius: 0 4px 4px 0;
        }

        .skill-tag {
            background-color: #eff6ff;
            color: #1e40af;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 500;
            display: inline-block;
            margin-right: 4px;
            margin-bottom: 4px;
        }

        @media print {
            body {
                background-color: white;
            }
            .a4-page {
                box-shadow: none;
                margin: 0;
                padding: 20px 30px;
                width: 100%;
                max-width: none;
            }
            .no-print {
                display: none;
            }
        }
      `}</style>

      <div className="a4-page">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">秦宇</h1>
                <h2 className="text-xl text-blue-700 font-medium">测试开发工程师 / 软件测试工程师</h2>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-600 space-y-1 text-right">
                <div className="flex items-center md:justify-end gap-2">
                    <i className="fas fa-phone-alt text-gray-400 w-4"></i> 18662732817
                </div>
                <div className="flex items-center md:justify-end gap-2">
                    <i className="fas fa-envelope text-gray-400 w-4"></i> 1642732247@qq.com
                </div>
                <div className="flex items-center md:justify-end gap-2">
                    <i className="fas fa-map-marker-alt text-gray-400 w-4"></i> 广州 (期望薪资：7-10K)
                </div>
            </div>
        </header>

        {/* Personal Highlights */}
        <section className="mb-8">
            <h3 className="section-title"><i className="fas fa-lightbulb"></i>个人优势</h3>
            <div className="highlights-box text-sm leading-relaxed text-gray-700 space-y-2">
                <p><strong className="text-gray-900">🚀 测试开发转型：</strong>具备从 0 到 1 搭建测试基础设施的能力。在职期间独立完成了 <span className="font-medium text-blue-800">Jenkins CI/CD 流水线</span>与 <span className="font-medium text-blue-800">MeterSphere 自动化测试平台</span>的私有化部署，具备 Linux 环境下的容器化运维与排障能力（Docker/Shell）。</p>
                <p><strong className="text-gray-900">🤖 AI 专项测试经验：</strong>深入参与 ChatBI 及大模型智能体项目，擅长使用 Python (<span className="font-medium text-blue-800">Pandas/NumPy</span>) 编写脚本对 <strong className="text-gray-900">AI 接口生成的非结构化数据</strong>进行自动化清洗与校验，解决了 AI 结果难以量化验证的痛点。</p>
                <p><strong className="text-gray-900">🔧 自动化与工具链：</strong>熟练掌握 Python + Pytest + Selenium/Appium 框架设计；能开发数据构造、日志分析等<strong className="text-gray-900">测试效能工具</strong>，不仅能发现 Bug，更能通过技术手段提升团队测试效率。</p>
            </div>
        </section>

        {/* Professional Skills */}
        <section className="mb-8">
            <h3 className="section-title"><i className="fas fa-tools"></i>专业技能</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {/* Col 1 */}
                <div className="space-y-3">
                    <div>
                        <h4 className="font-bold text-gray-800 mb-1">编程与脚本</h4>
                        <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
                            <li>熟练掌握 <span className="skill-tag">Python</span>，利用 requests/pandas/BeautifulSoup 编写脚本。</li>
                            <li>熟悉 Shell 脚本，处理 Linux 文本流及自动化运维。</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 mb-1">DevOps 与环境管理</h4>
                        <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
                            <li>熟练掌握 <span className="skill-tag">Jenkins</span> CI/CD，配置 Webhook 自动构建。</li>
                            <li>熟练使用 <span className="skill-tag">Docker</span> 编写 Dockerfile 快速搭建测试环境。</li>
                            <li>Linux 服务器日志排查与进程管理。</li>
                        </ul>
                    </div>
                </div>
                {/* Col 2 */}
                <div className="space-y-3">
                    <div>
                        <h4 className="font-bold text-gray-800 mb-1">自动化与 AI 测试</h4>
                        <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
                            <li>精通 <span className="skill-tag">Pytest</span> 框架及 PO (Page Object) 模式。</li>
                            <li>熟悉 AI/LLM 测试方法论，Prompt 调优及内容校验。</li>
                            <li>熟悉 MeterSphere 平台部署与维护。</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 mb-1">常规测试</h4>
                        <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
                            <li>熟练使用 Postman, JMeter, Fiddler, Charles。</li>
                            <li>掌握 MySQL/Oracle，编写复杂 SQL 校验数据。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Work Experience */}
        <section className="mb-8">
            <h3 className="section-title"><i className="fas fa-briefcase"></i>工作经历</h3>
            
            {/* Job 1 */}
            <div className="mb-6 relative pl-4 border-l-2 border-gray-200">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5"></div>
                <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-lg font-bold text-gray-900">北京零壹视界科技有限公司</h4>
                    <span className="text-sm text-gray-500 font-medium">2025.06 – 至今</span>
                </div>
                <div className="text-sm text-blue-700 font-medium mb-2">测试开发工程师</div>
                <p className="text-sm text-gray-600 mb-3 italic">项目背景：企业级 AI 智能体应用平台（低代码 aPaaS/iPaaS 架构），集成 ChatBI 与大模型智能体开发。</p>
                
                <div className="space-y-3 text-sm text-gray-700">
                    <div>
                        <strong className="block text-gray-900 mb-1">1. 测试环境容器化与 CI/CD 建设（DevOps）</strong>
                        <p className="pl-0">改变原有手工部署模式，编写 Dockerfile/Docker-compose 实现环境一键部署，搭建耗时<span className="font-medium text-orange-600">从 1 天缩短至 2 小时内</span>。独立部署 Jenkins，打通“Git 提交 -&gt; 自动构建 -&gt; Pytest 测试 -&gt; IM 通知”闭环。</p>
                    </div>
                    <div>
                        <strong className="block text-gray-900 mb-1">2. AI 接口与数据自动化验证</strong>
                        <p className="pl-0">开发基于 Python (Pandas) 的校验脚本。针对 Text-to-SQL 模型，构建自动化评测工具，通过比对 SQL 执行结果集验证逻辑正确性，有效拦截 90% 的 <span className="font-medium text-orange-600">AI 幻觉</span>问题。</p>
                    </div>
                    <div>
                        <strong className="block text-gray-900 mb-1">3. 测试效能工具落地</strong>
                        <p className="pl-0">负责 MeterSphere 平台私有化部署，迁移 1000+ 条接口用例实现统一管理。编写数据构造脚本解决手工造数痛点。</p>
                    </div>
                </div>
            </div>

            {/* Job 2 */}
            <div className="mb-2 relative pl-4 border-l-2 border-gray-200">
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-[7px] top-1.5"></div>
                <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-lg font-bold text-gray-900">湖南展通佳创能源有限公司</h4>
                    <span className="text-sm text-gray-500 font-medium">2025.03 – 2025.06</span>
                </div>
                <div className="text-sm text-blue-700 font-medium mb-2">软件测试实习生</div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li><strong className="text-gray-800">功能测试：</strong>独立执行 400+ 条用例，覆盖订单流转等核心业务，闭环 80+ 个缺陷。</li>
                    <li><strong className="text-gray-800">IoT 联调：</strong>主导 10+ 个站点环境搭建，完成 AI 识别盒子、摄像头等硬件对接。</li>
                    <li><strong className="text-gray-800">接口测试：</strong>使用 Postman 协助前后端联调；编写《测试环境搭建指南》沉淀文档。</li>
                </ul>
            </div>
        </section>

        {/* Project Experience */}
        <section className="mb-8">
            <h3 className="section-title"><i className="fas fa-rocket"></i>项目经历</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project 1 */}
                <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-1">B2C 电商 UI 自动化测试框架</h4>
                    <div className="text-xs text-gray-500 mb-2">Python + Selenium + Pytest + Jenkins</div>
                    <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                        <li>采用 POM 模式封装页面，实现代码高复用。</li>
                        <li>集成 Allure 报告并接入 Jenkins 每日巡检。</li>
                        <li><span className="text-blue-700 font-medium">成果：</span>回归效率提升 60%，获评年度示范作业。</li>
                    </ul>
                </div>

                {/* Project 2 */}
                <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-1">Android ToDo 应用自动化测试</h4>
                    <div className="text-xs text-gray-500 mb-2">Appium + Pytest + Python</div>
                    <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                        <li>搭建 Android 自动化环境，编写 Python 脚本验证增删改查。</li>
                        <li>结合 Fiddler 进行弱网与接口异常测试。</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Education & Certs */}
        <section>
            <h3 className="section-title"><i className="fas fa-graduation-cap"></i>教育经历 & 证书</h3>
            <div className="flex flex-col md:flex-row justify-between text-sm text-gray-700 mb-2">
                <div>
                    <strong className="text-gray-900">湖南涉外经济学院</strong> | 软件工程 (本科)
                </div>
                <div className="text-gray-500">2022 – 2026 | 专业排名：前 10%</div>
            </div>
            <p className="text-xs text-gray-600 mb-3">主修课程：软件工程、软件测试、Python、数据库 | 在校经历：班长，“黄城图书管理系统”负责人</p>
            <div className="flex gap-3 text-xs font-medium text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded">驾驶证 C1</span>
                <span className="bg-gray-100 px-2 py-1 rounded">普通话二级乙等</span>
                <span className="bg-gray-100 px-2 py-1 rounded">大学英语四级 (CET-4)</span>
            </div>
        </section>
      </div>
    </>
  );
};

export default App;