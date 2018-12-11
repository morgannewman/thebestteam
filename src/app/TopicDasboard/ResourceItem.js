import React from 'react';
import PropTypes from 'prop-types';
import ResourceEditForm from './ResourceEditForm';
import ResourceView from './ResourceView';
import { connect } from 'react-redux';
import {
  update_resource,
  get_resources
} from '../../controller/actions/resource';
import './ResourceItem.scss';
// import { Link } from 'react-router-dom';

//TODO: use Link so so the resource title links to it's corresponding
//resource page
//TODO:remove console.logs
export class ResourceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  static propTypes = {
    resource: PropTypes.object.isRequired
  };

  /**
   * Used by the ResourceData component
   *This function is passed in through a prop and eventually called 
   by a lower level component
   *It was working with state, however the intention of this function 
   is to communicate to the back end whether a resource item is completed. Currently a resource 
   is rendered with a checked or unchecked box depending whether the completed property is true or false
  *The intention of this function is to make a PUT request to resources endpoint
   */
  //FIXME: connect function to dispatch async action to backend
  handleChecked = e => {
    const id = e.target.id;
    const resource = this.props.resources.find(resc => (resc.id = id));
    // console.log(resource.completed, 42);
    this.props.dispatch(
      update_resource(id, { completed: !resource.completed, id })
    );
    this.props.dispatch(get_resources(resource.parent.id));
  };
  /**
   * Used by the ResourceData component
   *This function takes an event and extracts the id of the resource where the event 
   occured(the resource that was clicked)
   *The intention of this function is to make a DELETE request to resources endpoint
   * This function is passed in through a prop and eventually called by a lower level component
   * @param {{e: object}} eventobject
   */
  //FIXME: connect function to dispatch async action to backend
  handleDelete = e => {
    const id = e.target.getAttribute('resourceid');
    console.log(`Deletes resource with id: ${id}`);
  };

  /**
   * Used by the ResourceData component
   *This function takes an event and extracts the id of the resource where 
   the event occured(the resource that was clicked)
   *This function might not need the event and can be deleted if unnecessary
   *It is responsible for communicating to state that the ResourceEditForm component should
   be rendered instead of the normal view mode
   * @param {{e: object}} eventobject
   */

  //FIXME: Delete event argument if unnecessary
  handleEdit = e => {
    const id = e.target.getAttribute('resourceid');
    console.log(`Edits resource with id: ${id}`);
    this.setState({ editing: !this.state.editing });
  };

  /**
   * Used by the ResourceEditFrom component
   *Toggles between form and view mode
   * passed down through props
   * Takes in the event object from child and handles form submission
   *    * @param {{e: object}} eventobject
   */

  handleUpdate = e => {
    e.preventDefault();
    const newTitle = e.currentTarget.getElementsByTagName('INPUT')[0].value;
    const id = e.target.getAttribute('resourceid');
    if (newTitle === undefined) {
      return;
    }
    console.log(`Updates resource with id: ${id} and name ${newTitle.trim()}`);
    this.setState({ editing: !this.state.editing });
  };

  render() {
    const { resource } = this.props;
    console.log(this.props.resources, 'rescource item');

    return (
      <div>
        {!this.state.editing ? (
          <ResourceView
            handleEdit={this.handleEdit}
            handleChecked={this.handleChecked}
            handleDelete={this.handleDelete}
            resource={resource}
          />
        ) : (
          <ResourceEditForm
            handleUpdate={this.handleUpdate}
            resource={resource}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    parentId: state.resourceReducer.topicId,
    resources: state.resourceReducer.resources
  };
};
export default connect(mapStateToProps)(ResourceItem);
