/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import prettier from 'prettier/standalone'
import parserJS from 'prettier/parser-babylon'

import { useEditor } from './editor-context'
import InlineRender from './inline-render'
import { PreviewArea, Device } from './device-preview'

const Wrap = props => (
  <div
    sx={{
      width: '60%',
      backgroundColor: 'white',
      height: 'calc(100vh - 41px)',
      overflow: 'scroll'
    }}
    {...props}
  />
)

// TODO: replace with ThemeUI breakpoints
const devices = [
  { name: 'Mobile', width: 380 },
  { name: 'Tablet', width: 720 },
  { name: 'Desktop', width: 1200 }
]

export default ({ code, transformedCode, scope, theme }) => {
  const { mode } = useEditor()

  if (mode === 'code') {
    return (
      <Wrap>
        <Styled.pre
          language="js"
          sx={{
            mt: 0,
            backgroundColor: 'white',
            color: 'black'
          }}
        >
          {prettier.format(code, {
            parser: 'babel',
            plugins: [parserJS]
          })}
        </Styled.pre>
      </Wrap>
    )
  }

  if (mode === 'viewports') {
    return (
      <PreviewArea>
        {devices.map(device => (
          <Device
            key={device.name}
            name={device.name}
            width={device.width}
            height={500}
          >
            <InlineRender scope={scope} code={transformedCode} theme={theme} />
          </Device>
        ))}
      </PreviewArea>
    )
  }

  return (
    <Wrap>
      <InlineRender scope={scope} code={transformedCode} theme={theme} />
    </Wrap>
  )
}
