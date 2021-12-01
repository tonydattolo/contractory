import { useGeneratePDFofContractMutation } from 'slices/contractsAPI'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function GeneratePdfButton({ contract_id }) {
 
  const [generatePDF, {
    loading,
    error,
    data,
  }] = useGeneratePDFofContractMutation({

    })
 
    return (
        <Button
            variant="primary"
            onClick={generatePDF}
            disabled={loading}
        >
            Generate PDF
        </Button>
    )
}

