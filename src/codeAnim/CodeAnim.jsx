import React from 'react'
import './CodeAnim.css'
import { Box, Typography } from '@mui/material'
import { Circle } from '@mui/icons-material'
import Typed from 'typed.js'

const CodeAnim = () => {

    const codeLineNum = {
        color: 'gray',
        fontFamily: "'Source Code Pro', monospace",
        fontSize: '.9rem',
        lineHeight: '1.46rem'
    }

    const el = React.useRef(null);

    const lineNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    const code = `<span style='color: #3f8151'>// Use any HTTP Request Libraries like Fetch, Axios, Ajax etc.</span><br>
                <span style='color: #dcd997'>fetch</span>
                <span style='color: #af63cb'>(</span>
                <span style = 'color: #b76a4a'>'https://api-formease.domain.com/form?api_key=&lt;&lt;api_key&gt;&gt;&form_id=&lt;&lt;form_id&gt;&gt;</span>
                <span style= 'color: #fff'>,</span>&nbsp;
                <span style= 'color: #1985f3'>{</span><br>
                <span style= 'color: #8bdbfe'>&emsp;method: </span>
                <span style='color: #b76a4a'>'POST'</span>
                <span style= 'color: #fff'>,</span><br>
                <span style= 'color: #8bdbfe'>&emsp;headers: </span>
                <span style='color: yellow'>{ </span>
                <span style='color: #b76a4a'>'Content-Type'</span>
                <span style= 'color: #8bdbfe'>: </span>
                <span style='color: #b76a4a'>'application/json' </span>
                <span style='color: yellow'>}</span>
                <span style= 'color: #fff'>,</span><br>
                <span style= 'color: #8bdbfe'>&emsp;body: JSON</span>
                <span style= 'color: #fff'>.</span>
                <span style='color: #dcd997'>stringify</span>
                <span style= 'color: yellow'>(</span>
                <span style= 'color: #af63cb'>{</span><br>
                <span style= 'color: #8bdbfe'>&emsp;&emsp;name: </span>
                <span style='color: #b76a4a'>"Prajil"</span>
                <span style= 'color: #fff'>,</span><br>
                <span style= 'color: #8bdbfe'>&emsp;&emsp;email: </span>
                <span style='color: #b76a4a'>"prajil@gmail.com"</span>
                <span style= 'color: #fff'>,</span><br>
                <span style= 'color: #8bdbfe'>&emsp;&emsp;message: </span>
                <span style='color: #b76a4a'>"Hi, try using formeas it's free!"</span><br>
                <span style= 'color: #af63cb'>&emsp;}</span>
                <span style= 'color: yellow'>)</span><br>
                <span style= 'color: #1985f3'>}</span>
                <span style= 'color: #af63cb'>)</span><br>
                <span style='color: #fff'>.</span>
                <span style= 'color: #dcd997'>then</span>
                <span style = 'color: #af63cb'>(</span>
                <span style= 'color: #8bdbfe'>response</span>&nbsp;
                <span style= 'color: #4d94c4'>=&gt;</span>&nbsp;
                <span style= 'color: #8bdbfe'>response</span>
                <span style= 'color: #ffffff'>.</span>
                <span style= 'color: #dcd997'>json</span>
                <span style= 'color: #1996eb'>(</span>
                <span style= 'color: #1996eb'>)</span>
                <span style= 'color: #af63cb'>)</span><br>
                <span style='color: #fff'>.</span>
                <span style= 'color: #dcd997'>then</span>
                <span style = 'color: #af63cb'>(</span>
                <span style= 'color: #8bdbfe'>data</span>&nbsp;
                <span style= 'color: #4d94c4'>=&gt;</span>&nbsp;
                <span style= 'color: #8bdbfe'>console</span>
                <span style= 'color: #ffffff'>.</span>
                <span style= 'color: #dcd997'>log</span>
                <span style= 'color: #1996eb'>(</span>
                <span style= 'color: #8bdbfe'>data</span>
                <span style= 'color: #1996eb'>)</span>
                <span style= 'color: #af63cb'>)</span><br>
                <span style='color: #fff'>.</span>
                <span style= 'color: #dcd997'>catch</span>
                <span style = 'color: #af63cb'>(</span>
                <span style= 'color: #8bdbfe'>error</span>&nbsp;
                <span style= 'color: #4d94c4'>=&gt;</span>&nbsp;
                <span style= 'color: #8bdbfe'>console</span>
                <span style= 'color: #ffffff'>.</span>
                <span style= 'color: #dcd997'>error</span>
                <span style= 'color: #1996eb'>(</span>
                <span style= 'color: #8bdbfe'>error</span>
                <span style= 'color: #1996eb'>)</span>
                <span style= 'color: #af63cb'>)</span>`.split("\n").map(line => line.trim()).join("")

    React.useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                code
            ],
            typeSpeed: 10,
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{
                width: '100%',
                backgroundColor: '#081c30',
                borderRadius: '10px 10px 0 0',
                p: 1,
                textAlign: 'left'
            }}>
                <Circle sx={{ color: '#FF605C' }} fontSize='1rem' />
                <Circle sx={{ color: '#FFBD44' }} fontSize='1rem' />
                <Circle sx={{ color: '#00CA4E' }} fontSize='1rem' />
            </Box>
            <Box sx={{
                width: '100%',
                height: '320px',
                p: 1,
                backgroundColor: '#0c2e4e',
                display: 'flex'
            }}>
                <Box sx={{ pr: 1, overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
                    {lineNumber.map((num, i) => {
                        return <Typography variant='body1' sx={codeLineNum} key={i}>{num}</Typography>
                    })}
                </Box>
                <Box sx={{
                    flex: 1,
                    px: 2,
                    overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none' },
                    textAlign: 'left',
                    lineHeight: '1.4rem'
                }}>
                    <span ref={el} style={{ fontSize: '.9rem', fontFamily: "'Source Code Pro', monospace", whiteSpace: 'nowrap' }}></span>
                </Box>
            </Box>
            <Box sx={{
                width: '100%',
                backgroundColor: '#081c30',
                p: 1,
                pb: 0,
                textAlign: 'left'
            }}>
                <span style={{
                    color: '#01c2ec',
                    fontSize: '.9rem',
                    fontFamily: "'Source Code Pro', monospace'",
                    borderBottom: '2px solid #01c2ec'
                }}>Console</span>
            </Box>
            <Box sx={{
                width: '100%',
                height: '180px',
                p: 1,
                overflowX: 'scroll',
                whiteSpace: 'nowrap',
                backgroundColor: '#0c2e4e',
                borderRadius: '0 0 10px 10px',
                display: 'flex',
                textAlign: 'left',
                lineHeight: '1.2rem',
                '::-webkit-scrollBar': {
                    display: 'none'
                }
            }}>
                <Box sx={{ pr: 1 }}>
                    <span style={{
                        color: 'white',
                        fontSize: '.8rem',
                        userSelect: 'none'
                    }}>
                        <span style={{ color: '#3f8151' }}>&frasl;&frasl; Server response</span>
                        <br />
                        <span style={{ color: '#1985f3' }}>&#123;</span>
                        <br />&emsp;&emsp;<span style={{ color: '#8bdbfe' }}>success: &nbsp;</span>
                        <span style={{ color: '#7c91f9' }}>true</span>,<br />&emsp;&emsp;
                        <span style={{ color: '#8bdbfe' }}>message: &nbsp;</span>
                        <span style={{ color: '#37fbb3' }}>"Form submission saved successfully"</span>,<br />&emsp;&emsp;
                        <span style={{ color: '#8bdbfe' }}>formId: &nbsp;</span>
                        <span style={{ color: '#37fbb3' }}>"6eaa51a0029f"</span>,<br />&emsp;&emsp;
                        <span style={{ color: '#8bdbfe' }}>submissionId: &nbsp;</span>
                        <span style={{ color: '#37fbb3' }}>"64412882cpd327719c3d70a6"</span>,<br />&emsp;&emsp;
                        <span style={{ color: '#8bdbfe' }}>sendMail: &nbsp;</span>
                        <span style={{ color: '#7c91f9' }}>true</span><br />
                        <span style={{ color: '#1985f3' }}>&#125;</span>
                    </span>
                </Box>
            </Box>
        </Box>
    )
}

export default CodeAnim
