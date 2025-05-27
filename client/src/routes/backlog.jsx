import { createFileRoute } from '@tanstack/react-router'
import BacklogPage from '../pages/BacklogPage.jsx'

export const Route = createFileRoute('/backlog')({
  component: BacklogPage,
})