import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    users: [],
    totalUsers: 0,
    loading: false,
    error: null,
    currentPage: 1,
    perPage: 5,
    searchQuery: '',
    filters: {
      id: '',
      name: '',
      username: '',
      email: ''
    }
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload.users
      state.totalUsers = payload.total
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setCurrentPage(state, page) {
      state.currentPage = page
    },
    setSearchQuery(state, query) {
      state.searchQuery = query
      state.currentPage = 1
    },
    setFilters(state, filters) {
      state.filters = { ...state.filters, ...filters }
      state.currentPage = 1
    }
  },
  actions: {
    async fetchUsers({ commit, state }) {
      commit('setLoading', true)
      commit('setError', null)
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
          params: {
            page: state.currentPage,
            limit: state.perPage,
            q: state.searchQuery
          }
        })
        const filteredUsers = response.data.filter((user) => {
          for (const key in state.filters) {
            if (state.filters[key]) {
              if (key === 'id' && !user[key].toString().includes(state.filters[key].toString())) {
                return false
              }
              if (
                key === 'name' &&
                !user[key].toLowerCase().includes(state.filters[key].toLowerCase())
              ) {
                return false
              }
              if (
                key === 'username' &&
                !user[key].toLowerCase().includes(state.filters[key].toLowerCase())
              ) {
                return false
              }
              if (
                key === 'email' &&
                !user[key].toLowerCase().includes(state.filters[key].toLowerCase())
              ) {
                return false
              }
            }
          }
          return true
        })
        commit('setUsers', {
          users: filteredUsers,
          total: filteredUsers.length
        })
      } catch (error) {
        commit('setError', error)
      } finally {
        commit('setLoading', false)
      }
    }
  },
  getters: {
    users: (state) => state.users,
    totalUsers: (state) => state.totalUsers,
    loading: (state) => state.loading,
    error: (state) => state.error,
    currentPage: (state) => state.currentPage,
    perPage: (state) => state.perPage,
    totalPages: (state) => Math.ceil(state.totalUsers / state.perPage),
    searchQuery: (state) => state.searchQuery,
    filters: (state) => state.filters
  }
})
