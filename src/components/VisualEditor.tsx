import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Eye, 
  PencilSimple, 
  DeviceMobile, 
  Desktop, 
  Tablet,
  ArrowUUpLeft,
  ArrowUUpRight,
  FloppyDisk,
  Play,
  TextAa,
  Image as ImageIcon,
  SquaresFour,
  Trash
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { v4 as uuidv4 } from 'uuid'

// Constants for viewport breakpoints
const VIEWPORT_WIDTHS = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%'
} as const

// Default content for new elements
const DEFAULT_ELEMENT_CONTENT = {
  text: 'New text element',
  image: 'https://via.placeholder.com/400x300',
  button: 'Click me'
} as const

interface EditableElement {
  id: string
  type: 'text' | 'image' | 'button' | 'section'
  content: string
  styles: {
    fontSize?: string
    fontWeight?: string
    color?: string
    backgroundColor?: string
    padding?: string
    margin?: string
    borderRadius?: string
    textAlign?: string
    fontFamily?: string
  }
}

interface PageSection {
  id: string
  name: string
  elements: EditableElement[]
}

interface VisualEditorState {
  sections: PageSection[]
  selectedElement: string | null
  previewMode: 'desktop' | 'tablet' | 'mobile'
  isEditMode: boolean
}

const defaultSections: PageSection[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    elements: [
      {
        id: 'hero-title',
        type: 'text',
        content: 'Spooky-Cute Art, Handmade With Love',
        styles: {
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#000000',
          fontFamily: 'Nunito, sans-serif',
          textAlign: 'left',
          padding: '0',
          margin: '0 0 24px 0'
        }
      },
      {
        id: 'hero-subtitle',
        type: 'text',
        content: 'Unique creations blending whimsy and witchy vibes. Each piece is crafted with intention, from art prints to gemstone-adorned clay snakes that bring magic to your space.',
        styles: {
          fontSize: '18px',
          fontWeight: 'normal',
          color: '#666666',
          textAlign: 'left',
          padding: '0',
          margin: '0 0 32px 0'
        }
      },
      {
        id: 'hero-button',
        type: 'button',
        content: 'Shop New Arrivals',
        styles: {
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          backgroundColor: '#000000',
          padding: '12px 24px',
          borderRadius: '8px'
        }
      }
    ]
  },
  {
    id: 'about',
    name: 'About Section',
    elements: [
      {
        id: 'about-title',
        type: 'text',
        content: 'About Spookiki Creations',
        styles: {
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#000000',
          fontFamily: 'Nunito, sans-serif',
          textAlign: 'center',
          padding: '0',
          margin: '0 0 24px 0'
        }
      },
      {
        id: 'about-text',
        type: 'text',
        content: 'Welcome to Spookiki Creations! I create handmade spooky-cute art, ornaments, and gemstone clay snakes.',
        styles: {
          fontSize: '16px',
          fontWeight: 'normal',
          color: '#333333',
          textAlign: 'center',
          padding: '0',
          margin: '0'
        }
      }
    ]
  }
]

export function VisualEditor() {
  const [editorState, setEditorState] = useKV<VisualEditorState>('visual-editor-state', {
    sections: defaultSections,
    selectedElement: null,
    previewMode: 'desktop',
    isEditMode: true
  })

  const [undoStack, setUndoStack] = useState<VisualEditorState[]>([])
  const [redoStack, setRedoStack] = useState<VisualEditorState[]>([])
  const [localState, setLocalState] = useState<VisualEditorState>(editorState || {
    sections: defaultSections,
    selectedElement: null,
    previewMode: 'desktop',
    isEditMode: true
  })

  useEffect(() => {
    if (editorState) {
      setLocalState(editorState)
    }
  }, [editorState])

  const saveState = () => {
    setUndoStack([...undoStack, localState])
    setRedoStack([])
  }

  const undo = () => {
    if (undoStack.length > 0) {
      const newStack = [...undoStack]
      const previousState = newStack.pop()!
      setRedoStack([localState, ...redoStack])
      setLocalState(previousState)
    }
  }

  const redo = () => {
    if (redoStack.length > 0) {
      const newStack = [...redoStack]
      const nextState = newStack.shift()!
      setUndoStack([...undoStack, localState])
      setLocalState(nextState)
      setRedoStack(newStack)
    }
  }

  const handleSave = () => {
    setEditorState(localState)
    toast.success('Changes saved successfully!')
  }

  const handlePublish = () => {
    setEditorState(localState)
    toast.success('Website published successfully!')
  }

  const toggleEditMode = () => {
    setLocalState({ ...localState, isEditMode: !localState.isEditMode })
  }

  const selectElement = (elementId: string) => {
    saveState()
    setLocalState({ ...localState, selectedElement: elementId })
  }

  const updateElementContent = (sectionId: string, elementId: string, content: string) => {
    saveState()
    const newSections = localState.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          elements: section.elements.map(el => 
            el.id === elementId ? { ...el, content } : el
          )
        }
      }
      return section
    })
    setLocalState({ ...localState, sections: newSections })
  }

  const updateElementStyle = (sectionId: string, elementId: string, styleKey: string, styleValue: string) => {
    saveState()
    const newSections = localState.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          elements: section.elements.map(el => 
            el.id === elementId 
              ? { ...el, styles: { ...el.styles, [styleKey]: styleValue } } 
              : el
          )
        }
      }
      return section
    })
    setLocalState({ ...localState, sections: newSections })
  }

  const deleteElement = (sectionId: string, elementId: string) => {
    saveState()
    const newSections = localState.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          elements: section.elements.filter(el => el.id !== elementId)
        }
      }
      return section
    })
    setLocalState({ ...localState, sections: newSections, selectedElement: null })
    toast.success('Element deleted')
  }

  const addElement = (sectionId: string, type: 'text' | 'image' | 'button') => {
    saveState()
    const newElement: EditableElement = {
      id: `${type}-${uuidv4()}`,
      type,
      content: DEFAULT_ELEMENT_CONTENT[type],
      styles: {
        fontSize: type === 'button' ? '16px' : '18px',
        fontWeight: type === 'button' ? '600' : 'normal',
        color: type === 'button' ? '#ffffff' : '#000000',
        backgroundColor: type === 'button' ? '#000000' : 'transparent',
        padding: type === 'button' ? '12px 24px' : '0',
        borderRadius: type === 'button' ? '8px' : '0',
        textAlign: 'left'
      }
    }
    
    const newSections = localState.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          elements: [...section.elements, newElement]
        }
      }
      return section
    })
    setLocalState({ ...localState, sections: newSections, selectedElement: newElement.id })
    toast.success('Element added')
  }

  const getSelectedElement = () => {
    if (!localState.selectedElement) return null
    for (const section of localState.sections) {
      const element = section.elements.find(el => el.id === localState.selectedElement)
      if (element) return { section, element }
    }
    return null
  }

  const selectedData = getSelectedElement()

  const getPreviewWidth = () => {
    return VIEWPORT_WIDTHS[localState.previewMode]
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Toolbar */}
      <div className="bg-background border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={localState.isEditMode ? 'default' : 'outline'}
            size="sm"
            onClick={toggleEditMode}
          >
            <PencilSimple className="mr-2 h-4 w-4" />
            Edit Mode
          </Button>
          <Button
            variant={!localState.isEditMode ? 'default' : 'outline'}
            size="sm"
            onClick={toggleEditMode}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          
          <div className="h-6 w-px bg-border mx-2" />
          
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={undoStack.length === 0}
          >
            <ArrowUUpLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={redoStack.length === 0}
          >
            <ArrowUUpRight className="h-4 w-4" />
          </Button>
          
          <div className="h-6 w-px bg-border mx-2" />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocalState({ ...localState, previewMode: 'desktop' })}
            className={localState.previewMode === 'desktop' ? 'bg-accent' : ''}
          >
            <Desktop className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocalState({ ...localState, previewMode: 'tablet' })}
            className={localState.previewMode === 'tablet' ? 'bg-accent' : ''}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocalState({ ...localState, previewMode: 'mobile' })}
            className={localState.previewMode === 'mobile' ? 'bg-accent' : ''}
          >
            <DeviceMobile className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <FloppyDisk className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button size="sm" onClick={handlePublish}>
            <Play className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Canvas */}
        <div className="flex-1 overflow-auto bg-muted/30 p-8">
          <div 
            className="mx-auto bg-background shadow-lg transition-all duration-300"
            style={{ width: getPreviewWidth(), minHeight: '600px' }}
          >
            {localState.sections.map(section => (
              <div 
                key={section.id}
                className="border-b border-border p-8 relative group"
              >
                {localState.isEditMode && (
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                      {section.name}
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => addElement(section.id, 'text')}
                    >
                      <TextAa className="h-3 w-3 mr-1" />
                      Text
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => addElement(section.id, 'image')}
                    >
                      <ImageIcon className="h-3 w-3 mr-1" />
                      Image
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => addElement(section.id, 'button')}
                    >
                      <SquaresFour className="h-3 w-3 mr-1" />
                      Button
                    </Button>
                  </div>
                )}
                
                {section.elements.map(element => (
                  <div
                    key={element.id}
                    className={`relative group/element ${
                      localState.isEditMode ? 'cursor-pointer hover:outline hover:outline-2 hover:outline-primary' : ''
                    } ${
                      localState.selectedElement === element.id ? 'outline outline-2 outline-primary' : ''
                    }`}
                    onClick={(e) => {
                      if (localState.isEditMode) {
                        e.stopPropagation()
                        selectElement(element.id)
                      }
                    }}
                  >
                    {element.type === 'text' && (
                      <div
                        style={element.styles}
                        contentEditable={localState.isEditMode && localState.selectedElement === element.id}
                        suppressContentEditableWarning
                        onBlur={(e) => updateElementContent(section.id, element.id, e.currentTarget.textContent || '')}
                      >
                        {element.content}
                      </div>
                    )}
                    
                    {element.type === 'image' && (
                      <img 
                        src={element.content} 
                        alt="Editable" 
                        style={element.styles}
                        className="max-w-full h-auto"
                      />
                    )}
                    
                    {element.type === 'button' && (
                      <button
                        style={element.styles}
                        className="inline-block"
                      >
                        {element.content}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Properties Panel */}
        {localState.isEditMode && (
          <div className="w-80 border-l border-border bg-background overflow-auto">
            <div className="p-4">
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Properties
              </h3>
              
              {selectedData ? (
                <Tabs defaultValue="content" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-4">
                    <div>
                      <Label>Element Type</Label>
                      <p className="text-sm text-muted-foreground capitalize">{selectedData.element.type}</p>
                    </div>
                    
                    {selectedData.element.type === 'text' && (
                      <div>
                        <Label htmlFor="content">Text Content</Label>
                        <Textarea
                          id="content"
                          value={selectedData.element.content}
                          onChange={(e) => updateElementContent(selectedData.section.id, selectedData.element.id, e.target.value)}
                          rows={4}
                        />
                      </div>
                    )}
                    
                    {selectedData.element.type === 'image' && (
                      <div>
                        <Label htmlFor="image-url">Image URL</Label>
                        <Input
                          id="image-url"
                          value={selectedData.element.content}
                          onChange={(e) => updateElementContent(selectedData.section.id, selectedData.element.id, e.target.value)}
                          placeholder="https://example.com/image.jpg"
                        />
                        {selectedData.element.content && (
                          <img 
                            src={selectedData.element.content} 
                            alt="Preview" 
                            className="mt-2 w-full h-32 object-cover rounded"
                          />
                        )}
                      </div>
                    )}
                    
                    {selectedData.element.type === 'button' && (
                      <div>
                        <Label htmlFor="button-text">Button Text</Label>
                        <Input
                          id="button-text"
                          value={selectedData.element.content}
                          onChange={(e) => updateElementContent(selectedData.section.id, selectedData.element.id, e.target.value)}
                        />
                      </div>
                    )}
                    
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => deleteElement(selectedData.section.id, selectedData.element.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Element
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="style" className="space-y-4">
                    <div>
                      <Label htmlFor="font-size">Font Size</Label>
                      <Input
                        id="font-size"
                        value={selectedData.element.styles.fontSize || '16px'}
                        onChange={(e) => updateElementStyle(selectedData.section.id, selectedData.element.id, 'fontSize', e.target.value)}
                        placeholder="16px"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="font-weight">Font Weight</Label>
                      <Select
                        value={selectedData.element.styles.fontWeight || 'normal'}
                        onValueChange={(value) => updateElementStyle(selectedData.section.id, selectedData.element.id, 'fontWeight', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                          <SelectItem value="600">Semi-Bold</SelectItem>
                          <SelectItem value="300">Light</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="text-color">Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="text-color"
                          type="color"
                          value={selectedData.element.styles.color || '#000000'}
                          onChange={(e) => updateElementStyle(selectedData.section.id, selectedData.element.id, 'color', e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          value={selectedData.element.styles.color || '#000000'}
                          onChange={(e) => updateElementStyle(selectedData.section.id, selectedData.element.id, 'color', e.target.value)}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bg-color">Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="bg-color"
                          type="color"
                          value={selectedData.element.styles.backgroundColor || '#ffffff'}
                          onChange={(e) => updateElementStyle(selectedData.section.id, selectedData.element.id, 'backgroundColor', e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          value={selectedData.element.styles.backgroundColor || '#ffffff'}
                          onChange={(e) => updateElementStyle(selectedData.section.id, selectedData.element.id, 'backgroundColor', e.target.value)}
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="text-align">Text Align</Label>
                      <Select
                        value={selectedData.element.styles.textAlign || 'left'}
                        onValueChange={(value) => updateElementStyle(selectedData.section.id, selectedData.element.id, 'textAlign', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                          <SelectItem value="justify">Justify</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="padding">Padding</Label>
                      <Input
                        id="padding"
                        value={selectedData.element.styles.padding || '0'}
                        onChange={(e) => updateElementStyle(selectedData.section.id, selectedData.element.id, 'padding', e.target.value)}
                        placeholder="0 or 12px 24px"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="margin">Margin</Label>
                      <Input
                        id="margin"
                        value={selectedData.element.styles.margin || '0'}
                        onChange={(e) => updateElementStyle(selectedData.section.id, selectedData.element.id, 'margin', e.target.value)}
                        placeholder="0 or 12px 24px"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="border-radius">Border Radius</Label>
                      <Input
                        id="border-radius"
                        value={selectedData.element.styles.borderRadius || '0'}
                        onChange={(e) => updateElementStyle(selectedData.section.id, selectedData.element.id, 'borderRadius', e.target.value)}
                        placeholder="0 or 8px"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <PencilSimple className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select an element to edit its properties</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
