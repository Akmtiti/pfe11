import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../../../actions/posts.js"

function DataGridRows(filter = null, prestataireId = null) {
  // const {prestataires} = useSelector((state) => state.prestataire)
  const { posts } = useSelector((state) => state.posts)
  var filteredPost =posts


  if (posts.length === 0) return null


  filteredPost =  filter ? posts.filter((post) => post.status === filter) : filteredPost
  filteredPost =  prestataireId ? posts.filter((post) => post.creator === prestataireId) : filteredPost

  return filteredPost
}

export default DataGridRows
// "613d08d65ed9314b60d4f6b4"