import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export async function generatePDF(elementId: string, fileName: string): Promise<void> {
  try {
    // Afficher un message de chargement
    const loadingMessage = document.createElement("div")
    loadingMessage.style.position = "fixed"
    loadingMessage.style.top = "50%"
    loadingMessage.style.left = "50%"
    loadingMessage.style.transform = "translate(-50%, -50%)"
    loadingMessage.style.padding = "20px"
    loadingMessage.style.background = "rgba(255, 255, 255, 0.9)"
    loadingMessage.style.borderRadius = "8px"
    loadingMessage.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
    loadingMessage.style.zIndex = "9999"
    loadingMessage.innerHTML = "Génération du PDF en cours..."
    document.body.appendChild(loadingMessage)

    // Récupérer l'élément à convertir en PDF
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Élément avec l'ID ${elementId} non trouvé`)
    }

    // Créer une copie de l'élément pour la manipulation
    const clone = element.cloneNode(true) as HTMLElement
    clone.style.width = `${element.offsetWidth}px`

    // Appliquer des styles temporaires pour l'impression
    const originalStyles = window.getComputedStyle(element)
    clone.style.backgroundColor = "white"
    clone.style.padding = "20px"

    // Ajouter temporairement le clone au document pour le rendu
    clone.style.position = "absolute"
    clone.style.left = "-9999px"
    document.body.appendChild(clone)

    // Générer le canvas à partir de l'élément
    const canvas = await html2canvas(clone, {
      scale: 2, // Meilleure qualité
      useCORS: true,
      logging: false,
      allowTaint: true,
    })

    // Supprimer le clone après utilisation
    document.body.removeChild(clone)

    // Créer un nouveau document PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Calculer les dimensions pour ajuster le contenu à la page
    const imgWidth = 210 // A4 width in mm (210mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Ajouter l'image au PDF
    const imgData = canvas.toDataURL("image/png")
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

    // Si le contenu est plus grand qu'une page, ajouter des pages supplémentaires
    let heightLeft = imgHeight
    let position = 0

    while (heightLeft > 297) {
      // A4 height in mm (297mm)
      position = heightLeft - 297
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, -position, imgWidth, imgHeight)
      heightLeft -= 297
    }

    // Enregistrer le PDF
    pdf.save(`${fileName}.pdf`)

    // Supprimer le message de chargement
    document.body.removeChild(loadingMessage)

    // Afficher un message de succès
    const successMessage = document.createElement("div")
    successMessage.style.position = "fixed"
    successMessage.style.top = "20px"
    successMessage.style.left = "50%"
    successMessage.style.transform = "translateX(-50%)"
    successMessage.style.padding = "10px 20px"
    successMessage.style.background = "#4CAF50"
    successMessage.style.color = "white"
    successMessage.style.borderRadius = "4px"
    successMessage.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.2)"
    successMessage.style.zIndex = "9999"
    successMessage.innerHTML = "PDF généré avec succès!"
    document.body.appendChild(successMessage)

    // Supprimer le message de succès après 3 secondes
    setTimeout(() => {
      document.body.removeChild(successMessage)
    }, 3000)
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error)
    alert("Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.")
  }
}
