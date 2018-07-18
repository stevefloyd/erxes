import React, { Component, Fragment } from 'react';
import Select from 'react-select-plus';
import PropTypes from 'prop-types';
import { FormControl, Button, Icon } from './';

const propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  onSave: PropTypes.func,
  onSelectChange: PropTypes.func,
  onRemoveOption: PropTypes.func
};

const contextTypes = {
  __: PropTypes.func
};

class Option extends Component {
  render() {
    const { option, onSelect } = this.props;
    const { onRemove } = option;

    return (
      <div onClick={e => onSelect(option, e)}>
        <span>{option.label}</span>
        <Icon onClick={() => onRemove(option.value)} icon="cancel-1" />
      </div>
    );
  }
}

Option.propTypes = {
  option: PropTypes.object,
  onSelect: PropTypes.func
};

class RemovableSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adding: false
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleAdding = this.handleAdding.bind(this);
    this.handleCancelAdding = this.handleCancelAdding.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderValue = this.renderValue.bind(this);
  }

  generateOptions() {
    const { options, onRemoveOption } = this.props;

    return options.map(option => ({
      value: option,
      label: option,
      onRemove: value => onRemoveOption(value)
    }));
  }

  renderValue() {
    const { value } = this.props;

    return <span>{value}</span>;
  }

  handleSave() {
    const { onSave } = this.props;
    const value = document.getElementById('removableSelect-value').value;

    if (onSave) {
      onSave(value);
    }

    this.setState({ adding: false });

    document.getElementById('removableSelect-value').value = '';
  }

  handleAdding() {
    this.setState({ adding: true });
  }

  handleCancelAdding() {
    this.setState({ adding: false });
  }

  renderInput() {
    const { __ } = this.context;
    const { buttonText } = this.props;

    if (this.state.adding) {
      return (
        <Fragment>
          <FormControl
            id="removableSelect-value"
            autoFocus
            onKeyPress={e => {
              if (e.key === 'Enter') this.handleSave();
            }}
          />
          <Button
            type="success"
            icon="cancel-1"
            btnStyle="simple"
            size="small"
            onClick={this.handleCancelAdding}
          >
            Cancel
          </Button>
          <Button
            type="success"
            btnStyle="success"
            size="small"
            icon="checked-1"
            onClick={this.handleSave}
          >
            Save
          </Button>
        </Fragment>
      );
    }

    return (
      <Button onClick={this.handleAdding} size="small" icon="add">
        {__(buttonText)}
      </Button>
    );
  }

  render() {
    const { value, placeholder, onSelectChange } = this.props;
    const { __ } = this.context;

    return (
      <Fragment>
        <Select
          placeholder={__(placeholder)}
          searchable={false}
          value={value}
          valueComponent={this.renderValue}
          onChange={selectedOption => onSelectChange(selectedOption)}
          options={this.generateOptions()}
          optionComponent={Option}
        />

        {this.renderInput()}
      </Fragment>
    );
  }
}

RemovableSelect.contextTypes = contextTypes;
RemovableSelect.propTypes = propTypes;

export default RemovableSelect;
