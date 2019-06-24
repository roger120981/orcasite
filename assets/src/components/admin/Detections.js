import React, { Component } from "react"
import { Query } from "react-apollo"
import { LIST_DETECTION_GROUPS } from "queries/detections"

import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableFooter from "@material-ui/core/TableFooter"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"

import Loader from "components/Loader"

export default class Detections extends Component {
  render() {
    return (
      <div className="admin-detections px-5">
        <h2>Detections</h2>
        <Query query={LIST_DETECTION_GROUPS}>
          {({ data, error, loading }) => {
            if (loading) return <Loader />
            if (error) return <div>Error retrieving detections</div>

            const { detectionGroups } = data
            return (
              <Paper elevation={1}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Time</TableCell>
                      <TableCell>Feed</TableCell>
                      <TableCell align="right">Timestamp</TableCell>
                      <TableCell align="right">Detections</TableCell>
                      <TableCell align="right">Listeners</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detectionGroups.map((detectionGroup, i) => (
                      <TableRow key={i} hover={true}>
                        <TableCell>{detectionGroup.timeBucket}</TableCell>
                        <TableCell>{detectionGroup.feed.slug}</TableCell>
                        <TableCell align="right">
                          {detectionGroup.detections[0].timestamp}
                        </TableCell>
                        <TableCell align="right">
                          {detectionGroup.detections.length}
                        </TableCell>
                        <TableCell align="right">
                          {Math.max(
                            ...detectionGroup.detections.map(
                              det => det.listener_count
                            )
                          ) || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            )
          }}
        </Query>
      </div>
    )
  }
}
