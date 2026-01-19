import { ResearchResults } from "@/components/research-results"

export default function ResearchResultsPage({ params }: { params: { id: string } }) {
  return <ResearchResults id={params.id} />
}
