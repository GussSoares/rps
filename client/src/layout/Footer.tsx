

export function Footer() {
	return (
		<footer className="fixed bottom-0 left-0 w-full bg-white shadow-inner py-4 px-6 text-sm text-center text-gray-500 z-50">
			© {new Date().getFullYear()} Minha Aplicação. Todos os direitos reservados.
		</footer>
	)
}