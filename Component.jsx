
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [sheets, setSheets] = useState([
    {
      id: "sheet1",
      name: "Sheet 1",
      data: [
        ["", "A", "B", "C", "D"],
        ["1", "", "", "", ""],
        ["2", "", "", "", ""],
        ["3", "", "", "", ""],
        ["4", "", "", "", ""],
      ],
    },
  ])
  const [activeSheet, setActiveSheet] = useState(sheets[0])
  const [selectedCell, setSelectedCell] = useState(null)
  const [cellValue, setCellValue] = useState("")
  const handleAddSheet = () => {
    const newSheet = {
      id: `sheet${sheets.length + 1}`,
      name: `Sheet ${sheets.length + 1}`,
      data: [
        ["", "A", "B", "C", "D"],
        ["1", "", "", "", ""],
        ["2", "", "", "", ""],
        ["3", "", "", "", ""],
        ["4", "", "", "", ""],
      ],
    }
    setSheets([...sheets, newSheet])
    setActiveSheet(newSheet)
  }
  const handleDeleteSheet = (sheet) => {
    setSheets(sheets.filter((s) => s.id !== sheet.id))
    setActiveSheet(sheets[0])
  }
  const handleSelectCell = (row, col) => {
    setSelectedCell({ row, col })
    setCellValue(activeSheet.data[row][col])
  }
  const handleCellValueChange = (e) => {
    setCellValue(e.target.value)
    if (selectedCell) {
      const { row, col } = selectedCell
      const newData = [...activeSheet.data]
      newData[row][col] = e.target.value
      setActiveSheet({ ...activeSheet, data: newData })
    }
  }
  const handleAddRow = () => {
    const newData = [...activeSheet.data]
    newData.push(Array(newData[0].length).fill(""))
    setActiveSheet({ ...activeSheet, data: newData })
  }
  const handleDeleteRow = (rowIndex) => {
    const newData = [...activeSheet.data]
    newData.splice(rowIndex, 1)
    setActiveSheet({ ...activeSheet, data: newData })
  }
  const handleAddColumn = () => {
    const newData = activeSheet.data.map((row) => [...row, ""])
    setActiveSheet({ ...activeSheet, data: newData })
  }
  const handleDeleteColumn = (colIndex) => {
    const newData = activeSheet.data.map((row) => {
      const newRow = [...row]
      newRow.splice(colIndex, 1)
      return newRow
    })
    setActiveSheet({ ...activeSheet, data: newData })
  }
  const handleResizeColumn = (colIndex, width) => {}
  const handleResizeRow = (rowIndex, height) => {}
  const handleFormulaEvaluation = () => {}
  const handleImportData = (file) => {}
  const handleExportData = () => {}
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-background border-b flex items-center justify-between px-4 py-2 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleAddSheet}>
            <PlusIcon className="w-5 h-5" />
            New Sheet
          </Button>
          <Tabs value={activeSheet.id} onValueChange={setActiveSheet}>
            <TabsList className="flex gap-2">
              {sheets.map((sheet) => (
                <TabsTrigger key={sheet.id} value={sheet.id}>
                  {sheet.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteSheet(sheet)
                    }}
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <UploadIcon className="w-5 h-5" />
            Import
          </Button>
          <Button variant="ghost">
            <DownloadIcon className="w-5 h-5" />
            Export
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-full">
          <div className="bg-muted border-r border-b flex items-center justify-end pr-2">
            <Button variant="ghost" onClick={handleAddRow}>
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
          <div className="bg-muted border-b flex items-center justify-end pr-2">
            <Button variant="ghost" onClick={handleAddColumn}>
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
          <div className="bg-muted border-r overflow-auto">
            {activeSheet.data.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center justify-end pr-2 h-10">
                <Button variant="ghost" onClick={() => handleDeleteRow(rowIndex)}>
                  <MinusIcon className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
          <div className="bg-background overflow-auto">
            <table className="w-full">
              <tbody>
                {activeSheet.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border p-2 ${
                          selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                            ? "bg-primary text-primary-foreground"
                            : ""
                        }`}
                        onClick={() => handleSelectCell(rowIndex, colIndex)}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <footer className="bg-background border-t flex items-center justify-between px-4 py-2 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleResizeColumn}>
            <ScalingIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={handleResizeRow}>
            <Rows2Icon className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            value={cellValue}
            onChange={handleCellValueChange}
            placeholder="Enter cell value"
            className="bg-muted px-2 py-1 rounded-md w-64"
          />
          <Button variant="ghost" onClick={handleFormulaEvaluation}>
            <ActivityIcon className="w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  )
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  )
}


function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function Rows2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 12h18" />
    </svg>
  )
}


function ScalingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M14 15H9v-5" />
      <path d="M16 3h5v5" />
      <path d="M21 3 9 15" />
    </svg>
  )
}


function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
                    }
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [sheets, setSheets] = useState([
    {
      id: "sheet1",
      name: "Sheet 1",
      data: [
        ["", "A", "B", "C", "D"],
        ["1", "", "", "", ""],
        ["2", "", "", "", ""],
        ["3", "", "", "", ""],
        ["4", "", "", "", ""],
      ],
    },
  ])
  const [activeSheet, setActiveSheet] = useState(sheets[0])
  const [selectedCell, setSelectedCell] = useState(null)
  const [cellValue, setCellValue] = useState("")
  const handleAddSheet = () => {
    const newSheet = {
      id: `sheet${sheets.length + 1}`,
      name: `Sheet ${sheets.length + 1}`,
      data: [
        ["", "A", "B", "C", "D"],
        ["1", "", "", "", ""],
        ["2", "", "", "", ""],
        ["3", "", "", "", ""],
        ["4", "", "", "", ""],
      ],
    }
    setSheets([...sheets, newSheet])
    setActiveSheet(newSheet)
  }
  const handleDeleteSheet = (sheet) => {
    setSheets(sheets.filter((s) => s.id !== sheet.id))
    setActiveSheet(sheets[0])
  }
  const handleSelectCell = (row, col) => {
    setSelectedCell({ row, col })
    setCellValue(activeSheet.data[row][col])
  }
  const handleCellValueChange = (e) => {
    setCellValue(e.target.value)
    if (selectedCell) {
      const { row, col } = selectedCell
      const newData = [...activeSheet.data]
      newData[row][col] = e.target.value
      setActiveSheet({ ...activeSheet, data: newData })
    }
  }
  const handleAddRow = () => {
    const newData = [...activeSheet.data]
    newData.push(Array(newData[0].length).fill(""))
    setActiveSheet({ ...activeSheet, data: newData })
  }
  const handleDeleteRow = (rowIndex) => {
    const newData = [...activeSheet.data]
    newData.splice(rowIndex, 1)
    setActiveSheet({ ...activeSheet, data: newData })
  }
  const handleAddColumn = () => {
    const newData = activeSheet.data.map((row) => [...row, ""])
    setActiveSheet({ ...activeSheet, data: newData })
  }
  const handleDeleteColumn = (colIndex) => {
    const newData = activeSheet.data.map((row) => {
      const newRow = [...row]
      newRow.splice(colIndex, 1)
      return newRow
    })
    setActiveSheet({ ...activeSheet, data: newData })
  }
  const handleResizeColumn = (colIndex, width) => {}
  const handleResizeRow = (rowIndex, height) => {}
  const handleFormulaEvaluation = () => {}
  const handleImportData = (file) => {}
  const handleExportData = () => {}
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-background border-b flex items-center justify-between px-4 py-2 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleAddSheet}>
            <PlusIcon className="w-5 h-5" />
            New Sheet
          </Button>
          <Tabs value={activeSheet.id} onValueChange={setActiveSheet}>
            <TabsList className="flex gap-2">
              {sheets.map((sheet) => (
                <TabsTrigger key={sheet.id} value={sheet.id}>
                  {sheet.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteSheet(sheet)
                    }}
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <UploadIcon className="w-5 h-5" />
            Import
          </Button>
          <Button variant="ghost">
            <DownloadIcon className="w-5 h-5" />
            Export
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-full">
          <div className="bg-muted border-r border-b flex items-center justify-end pr-2">
            <Button variant="ghost" onClick={handleAddRow}>
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
          <div className="bg-muted border-b flex items-center justify-end pr-2">
            <Button variant="ghost" onClick={handleAddColumn}>
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
          <div className="bg-muted border-r overflow-auto">
            {activeSheet.data.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center justify-end pr-2 h-10">
                <Button variant="ghost" onClick={() => handleDeleteRow(rowIndex)}>
                  <MinusIcon className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
          <div className="bg-background overflow-auto">
            <table className="w-full">
              <tbody>
                {activeSheet.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border p-2 ${
                          selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                            ? "bg-primary text-primary-foreground"
                            : ""
                        }`}
                        onClick={() => handleSelectCell(rowIndex, colIndex)}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <footer className="bg-background border-t flex items-center justify-between px-4 py-2 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleResizeColumn}>
            <ScalingIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={handleResizeRow}>
            <Rows2Icon className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            value={cellValue}
            onChange={handleCellValueChange}
            placeholder="Enter cell value"
            className="bg-muted px-2 py-1 rounded-md w-64"
          />
          <Button variant="ghost" onClick={handleFormulaEvaluation}>
            <ActivityIcon className="w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  )
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  )
}


function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function Rows2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 12h18" />
    </svg>
  )
}


function ScalingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M14 15H9v-5" />
      <path d="M16 3h5v5" />
      <path d="M21 3 9 15" />
    </svg>
  )
}


function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
    }
