                                                                           
                                                 
export function isRunnableInBrowser(language) {
  return ['javascript', 'python'].includes(String(language || '').toLowerCase())
}

export function findExternalResourceReferences() {
  return []
}

export function runUiChecksInFrame() {
  throw new Error('Preview rendering is unavailable in this build.')
}

export async function captureFrameScreenshot() {
  throw new Error('Screenshot capture is unavailable in this build.')
}

export async function runCodeAgainstTests() {
  throw new Error('Code execution is unavailable in this build.')
}
