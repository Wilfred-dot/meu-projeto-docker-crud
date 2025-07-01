'use client'

import { useEffect, useState } from 'react'

type User = {
  id: number
  nome: string
  email: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [editingUserId, setEditingUserId] = useState<number | null>(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }, [apiUrl])

  const handleCreateOrUpdate = async () => {
    if (!nome || !email) return
    setLoading(true)

    if (editingUserId) {
      // Atualizar
      const res = await fetch(`${apiUrl}/users/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email }),
      })
      if (res.ok) {
        const updatedUser = await res.json()
        setUsers(users.map(user => user.id === editingUserId ? updatedUser : user))
        setEditingUserId(null)
      }
    } else {
      // Criar
      const res = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email }),
      })
      if (res.ok) {
        const newUser = await res.json()
        setUsers([...users, newUser])
      }
    }

    setNome('')
    setEmail('')
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    await fetch(`${apiUrl}/users/${id}`, { method: 'DELETE' })
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleEdit = (user: User) => {
    setNome(user.nome)
    setEmail(user.email)
    setEditingUserId(user.id)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
          Cadastro de Usuários
        </h1>

        {/* Formulário */}
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            {editingUserId ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>

          <input
            type="text"
            placeholder="Nome"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none text-black placeholder:text-gray-700"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none text-black placeholder:text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition disabled:opacity-50"
            onClick={handleCreateOrUpdate}
          >
            {loading
              ? editingUserId
                ? 'Atualizando...'
                : 'Adicionando...'
              : editingUserId
              ? 'Atualizar Usuário'
              : 'Adicionar Usuário'}
          </button>
        </div>

        {/* Lista de usuários */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Usuários Cadastrados</h2>
          <ul className="space-y-3">
            {users.length === 0 ? (
              <p className="text-gray-500">Nenhum usuário cadastrado ainda.</p>
            ) : (
              users.map((user) => (
                <li
                  key={user.id}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{user.nome}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      Deletar
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  )
}
