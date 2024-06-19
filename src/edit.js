import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import './editor.scss';
import { Flex, FlexItem, PanelBody, PanelRow, TextControl, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {

  const { numOfColumns, borderRadius, flexContent } = attributes;
  console.log('numOfColumns: ', flexContent);

  const flexItems = Array.from({ length: numOfColumns }, (_, index) => (
    <FlexItem className='flex-item' style={{ borderRadius: borderRadius}}>
      <h3>
        Card { index + 1}
      </h3>
      <p>
        <RichText
          value='Dolor voluptate ut enim aliquip velit tempor ullamco est velit ad exercitation nisi. Laboris et ad anim aute id proident. Cupidatat cupidatat enim incididunt velit et laborum voluptate ea consequat fugiat occaecat exercitation tempor veniam.'
        />
      </p>
    </FlexItem>
  ));

  return (
    <>
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RangeControl
              label={ __('Number of items', '')}
              value={numOfColumns}
              onChange={(value) => setAttributes({ numOfColumns: value})}
              min={1}
              max={6}
              />
          </PanelRow>
          <PanelRow>
            <TextControl
              label='Border Radius'
              value={borderRadius} 
              onChange={(value) => setAttributes({ borderRadius: value})}
              />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <Flex {...useBlockProps({ attributes })}
        align='center'
        justify='space-around'
      >
        { flexItems }
      </Flex>
    </>
  );
}
